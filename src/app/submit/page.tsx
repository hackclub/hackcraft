import Link from "next/link";
import ProjectCard from "./ProjectCard";
import TiledDiv from "~/components/TiledDiv";
import Page from "~/components/Page";
import { getIdentity, getSubmissions, Identity } from "~/lib/api";

async function Projects({ identity }: { identity: Identity }) {
  let projects = await getSubmissions(
    identity.slack_id,
    identity.primary_email,
  );

  return (
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
  );
}

export default async function Submit() {
  const identity = await getIdentity();

  return (
    <Page back="/api/logout" backText="logout">
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
        <Projects identity={identity} />
      )}
    </Page>
  );
}
