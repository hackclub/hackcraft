import Link from "next/link";

export default function ProjectCard({
  project,
}: {
  project: {
    id: string;
    codeUrl?: string;
    playableUrl?: string;
    screenshots: { url: string }[];
    event?: string;
    status?: string;
  };
}) {
  return (
    <div
      style={{
        background: "rgba(8, 8, 8, 0.8)",
        border: "2px solid rgba(255, 255, 255, 0.08)",
        padding: "1.25rem",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 24px rgba(0, 0, 0, 0.35)",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}>
        <p className="muted">{project.event || "Event not set"}</p>
        <div style={{ display: "grid", justifyItems: "end", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: '"Minecraftia", sans-serif',
              fontSize: "0.75rem",
              padding: "0.25rem 0.6rem",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(20, 20, 20, 0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              borderColor:
                project.status == "Rejected"
                  ? "rgba(255, 85, 85, 0.7)"
                  : project.status == "Approved"
                    ? "rgba(141, 253, 92, 0.75)"
                    : project.status == "Draft"
                      ? "rgba(255, 214, 94, 0.7)"
                      : "rgba(96, 209, 255, 0.6)",
              color:
                project.status == "Rejected"
                  ? "#ffb0b0"
                  : project.status == "Approved"
                    ? "#bdfb9c"
                    : project.status == "Draft"
                      ? "#ffe79c"
                      : "#9bd7ff",
            }}>
            {project.status}
          </span>
          {project.screenshots.some(shot => shot.url) && (
            <div className="screenshots">
              {project.screenshots
                .filter(shot => shot.url)
                .slice(0, 4)
                .map(shot => (
                  <img src={shot.url} key={shot.url} />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="project-links">
        {project.status != "Approved" && (
          <Link href={`/project/${project.id}`}>Edit</Link>
        )}
        {project.codeUrl && (
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
            {new URL(project.codeUrl).pathname.substring(1)}
          </a>
        )}
        {project.playableUrl && (
          <a
            href={project.playableUrl}
            target="_blank"
            rel="noopener noreferrer">
            {new URL(project.playableUrl).pathname.substring(1)}
          </a>
        )}
      </div>
    </div>
  );
}
