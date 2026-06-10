"use client";

import Link from "next/link";
import { useState } from "react";
import Carrousel from "~/components/Carrousel";
import { Project } from "~/lib/util";

export default function ProjectCard({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <p className="muted">{project.event}</p>
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
          {project.screenshots.length > 0 && (
            <div className="screenshots">
              {project.screenshots.slice(0, 5).map((shot, i) => (
                <img
                  src={shot.url}
                  key={shot.url}
                  onClick={() => setOpenIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {openIndex !== null && (
        <Carrousel
          images={project.screenshots.map(shot => shot.url)}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
      <div className="project-links">
        {project.status != "Approved" && (
          <Link href={`/projects/${project.id}`}>Edit</Link>
        )}
        {project.code_url && (
          <a href={project.code_url} target="_blank" rel="noopener noreferrer">
            {new URL(project.code_url).pathname.substring(1)}
          </a>
        )}
        {project.playable_url && (
          <a
            href={project.playable_url}
            target="_blank"
            rel="noopener noreferrer">
            {new URL(project.playable_url).pathname.substring(1)}
          </a>
        )}
      </div>
    </div>
  );
}
