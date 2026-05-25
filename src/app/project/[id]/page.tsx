import Airtable from "airtable";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProjectForm from "./ProjectForm";

async function save(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const { identity } = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: {
      Authorization:
        "Bearer " + (await cookies()).get("hca_access_token")?.value,
    },
  }).then(r => r.json());
  if (!identity) return;

  const table = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base("appROpbCKgNm7r5ln")
    .table<any>("tblx8k1fmPtQgDeUu");

  const rec = id === "new" ? null : await table.find(id);
  if (
    (rec && rec.fields["Slack ID"] !== identity.slack_id) ||
    rec?.fields["Status"] === "Approved"
  )
    redirect("/submit");

  const address =
    identity?.addresses?.find((item: any) => item?.primary) ??
    identity?.addresses?.[0];
  const data = {
    "Code URL": formData.get("code_url"),
    "Playable URL": formData.get("playable_url"),
    Description: formData.get("description"),
    Screenshot: (formData.get("screenshots") as string)
      .split("\n")
      .map(url => ({ url })),
    Hackatime: formData.get("hackatime_projects"),
    "Optional - Override Hours Spent":
      parseInt(formData.get("hour_override") as string) || undefined,
    Notes: formData.get("notes"),
    Prize: formData.get("prize") || undefined,
    Event: formData.get("event"),
    Status: formData.get("intent") === "submit" ? "Submitted" : "Draft",
    "First Name": identity?.first_name,
    "Last Name": identity?.last_name,
    Email: identity?.primary_email,
    "Slack ID": identity?.slack_id,
    Birthday: identity?.birthday,
    "Address (Line 1)": address?.line_1,
    "Address (Line 2)": address?.line_2,
    City: address?.city,
    "State / Province": address?.state,
    "ZIP / Postal Code": address?.postal_code,
    Country: address?.country,
  };

  if (id == "new") table.create(data);
  else table.update(id, data);
  redirect("/submit");
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  let record;
  if (id !== "new") {
    const { identity } = await fetch("https://auth.hackclub.com/api/v1/me", {
      headers: {
        Authorization:
          "Bearer " + (await cookies()).get("hca_access_token")?.value,
      },
    }).then(r => r.json());

    record = (
      await fetch(
        "https://api.airtable.com/v0/appROpbCKgNm7r5ln/tblx8k1fmPtQgDeUu/" + id,
        {
          headers: {
            Authorization: "Bearer " + process.env.AIRTABLE_API_KEY,
          },
        },
      ).then(r => r.json())
    ).fields;

    if (
      !record ||
      !identity?.slack_id ||
      record["Slack ID"] !== identity?.slack_id
    )
      return (
        <Page back="/submit">
          <TiledDiv id="header" background="dirt">
            <div
              className="section"
              style={{
                border: "3px solid rgba(255, 85, 85, 0.6)",
                background: "rgba(18, 6, 6, 0.7)",
              }}>
              <h2>Project not found</h2>
              <p>We could not find that project.</p>
            </div>
          </TiledDiv>
        </Page>
      );
  }

  const hackatimeToken = (await cookies()).get("hackatime_access_token")?.value;
  if (!hackatimeToken)
    redirect(
      `https://hackatime.hackclub.com/oauth/authorize?client_id=${process.env.HACKATIME_CLIENT_ID}&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fhackatime%2Fcallback&response_type=code&scope=profile+read`,
    );

  const { projects } = await fetch(
    "https://hackatime.hackclub.com/api/v1/authenticated/projects",
    {
      headers: {
        Authorization: "Bearer " + hackatimeToken,
      },
    },
  ).then(r => r.json());

  const fields = await fetch(
    "https://api.airtable.com/v0/meta/bases/appROpbCKgNm7r5ln/tables",
    {
      headers: {
        Authorization: "Bearer " + process.env.AIRTABLE_API_KEY,
      },
      next: { revalidate: 86400 },
    },
  )
    .then(r => r.json())
    .then(data => data.tables.find(t => t.id === "tblx8k1fmPtQgDeUu").fields);

  return (
    <Page back="/submit">
      <TiledDiv id="header" background="dirt" style={{ paddingBottom: "1rem" }}>
        <div id="subtitle" style={{ fontSize: "1.2em", marginBottom: "2em" }}>
          <span>{id === "new" ? "New" : "Edit"} Project</span>
        </div>
        <ProjectForm
          id={id}
          record={record}
          fields={{
            events: fields
              .find((f: any) => f.name === "Event")
              ?.options?.choices.map((c: any) => c.name)
              .filter((name: string) => !name.startsWith("!")),
            prizes: fields
              .find((f: any) => f.name === "Prize")
              ?.options?.choices.map((c: any) => c.name)
              .filter((name: string) => !name.startsWith("!")),
            projects: projects.filter((p: any) => p.total_seconds > 3600),
          }}
          action={save}
        />
      </TiledDiv>
    </Page>
  );
}
