import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";
import { redirect } from "next/navigation";
import ProjectForm from "./ProjectForm";
import { getRecord, saveProject, deleteProject } from "~/lib/api";
import { FIELDS, getAccessToken, getIdentity, Project } from "~/lib/util";

async function save(formData: FormData) {
  "use server";
  const intent = formData.get("intent");
  const identity = await getIdentity();
  if (!identity) return;

  if (intent === "delete") {
    await deleteProject(formData.get("id") as string, identity);
    redirect("/projects");
  }

  try {
    const address =
      identity?.addresses?.find(item => item?.primary) ??
      identity?.addresses?.[0];

    await saveProject({
      id: formData.get("id") as string,
      identity,
      data: {
        [FIELDS.codeUrl]: formData.get("code_url"),
        [FIELDS.playableUrl]: formData.get("playable_url"),
        [FIELDS.description]: formData.get("description"),
        [FIELDS.screenshots]: ((formData.get("screenshots") as string) ?? "")
          .split("\n")
          .map(url => url.trim())
          .filter(Boolean)
          .map(url => ({ url })),
        [FIELDS.hackatimeProjects]: formData.get("hackatime_projects"),
        [FIELDS.hourOverride]:
          parseInt(formData.get("hour_override") as string) || undefined,
        [FIELDS.notes]: formData.get("notes"),
        [FIELDS.prize]: formData.get("prize") || undefined,
        [FIELDS.event]: formData.get("event"),
        [FIELDS.status]:
          formData.get("intent") === "submit" ? "Submitted" : "Draft",
        [FIELDS.firstName]: identity?.first_name,
        [FIELDS.lastName]: identity?.last_name,
        [FIELDS.email]: identity?.primary_email,
        [FIELDS.slackId]: identity?.slack_id,
        [FIELDS.birthday]: identity?.birthday,
        [FIELDS.addressLine1]: address?.line_1,
        [FIELDS.addressLine2]: address?.line_2,
        [FIELDS.city]: address?.city,
        [FIELDS.state]: address?.state,
        [FIELDS.postalCode]: address?.postal_code,
        [FIELDS.country]: address?.country,
      },
    });
  } catch (e: any) {
    console.error(e);
    redirect("/error?error=" + encodeURIComponent(e));
  }
  redirect("/projects");
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  let project: Project | undefined = undefined;
  if (id !== "new") {
    project = await getRecord(id);
  }

  const { projects } = await fetch(
    "https://hackatime.hackclub.com/api/v1/authenticated/projects",
    {
      headers: {
        Authorization: "Bearer " + (await getAccessToken("hackatime")),
      },
    },
  ).then(r => r.json());

  return (
    <Page back="/projects">
      <TiledDiv id="header" background="dirt" style={{ paddingBottom: "1rem" }}>
        <div id="subtitle" style={{ fontSize: "1.2em", marginBottom: "2em" }}>
          <span>{id === "new" ? "New" : "Edit"} Project</span>
        </div>
        <ProjectForm
          id={id}
          project={project}
          projects={projects.filter((p: any) => p.total_seconds > 3600)}
          action={save}
        />
      </TiledDiv>
    </Page>
  );
}
