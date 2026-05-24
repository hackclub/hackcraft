import Airtable from "airtable";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "./ProjectCard";
import TiledDiv from "~/components/TiledDiv";
import Page from "~/components/Page";

export default async function Submit() {
  const token = (await cookies()).get("hca_access_token")?.value;
  if (!token)
    redirect(
      `https://auth.hackclub.com/oauth/authorize?client_id=${process.env.HCA_CLIENT_ID}&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fhca%2Fcallback&response_type=code&scope=name+email+slack_id+verification_status`,
    );

  const { identity } = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(r => r.json());

  let projects: {
    id: string;
    codeUrl?: string;
    playableUrl?: string;
    screenshots: { url: string }[];
    event?: string;
    status?: string;
  }[] = [];

  if (identity?.ysws_eligible && identity.slack_id) {
    const records = await new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base("appROpbCKgNm7r5ln")("tblx8k1fmPtQgDeUu")
      .select({
        filterByFormula: `OR({Slack ID}="${identity.slack_id}",{Email}="${identity.primary_email}")`,
      })
      .all();

    projects = records.map(record => ({
      id: record.id,
      codeUrl: record.get("Code URL") as string | undefined,
      playableUrl: record.get("Playable URL") as string | undefined,
      screenshots:
        (record.get("Screenshot") as { url: string }[] | undefined) ?? [],
      event: record.get("Event") as string | undefined,
      status: record.get("Status") as string | undefined,
    }));
  }

  return (
    <Page back="/api/hca/logout" backText="logout">
      {!identity?.ysws_eligible ? (
        <TiledDiv id="header" background="dirt">
          <div
            className="section"
            style={{
              border: "3px solid rgba(255, 85, 85, 0.6)",
              background: "rgba(18, 6, 6, 0.7)",
            }}>
            <h2>Not eligible</h2>
            <p>
              Your verification status is{" "}
              <b>{identity?.verification_status ?? "unknown"}</b>.
            </p>
          </div>
        </TiledDiv>
      ) : (
        <>
          <TiledDiv id="header" background="dirt">
            <div
              className="section"
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg,rgba(10, 10, 10, 0.8),rgba(0, 0, 0, 0.7))",
                display: "flex",
                marginBottom: "1rem",
              }}>
              <div>
                <b>
                  {identity.first_name} {identity.last_name}
                </b>
                <p className="muted">{identity.primary_email}</p>
              </div>
              <Link
                className="hoverable form-link"
                href="/project/new"
                style={{
                  marginRight: "0",
                }}>
                New Project
              </Link>
            </div>
          </TiledDiv>

          <TiledDiv background="deepslate" style={{ padding: "2rem 0" }}>
            <div
              className="section"
              style={{
                width: "100%",
                margin: "0 auto",
                display: "grid",
                gap: "1rem",
              }}>
              {projects.length === 0 ? (
                <p>No projects yet.</p>
              ) : (
                projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
          </TiledDiv>
        </>
      )}
    </Page>
  );
}
