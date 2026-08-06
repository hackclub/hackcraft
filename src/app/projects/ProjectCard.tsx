"use client";

import Link from "next/link";
import { useState } from "react";
import Carrousel from "~/components/Carrousel";
import type { Project } from "~/lib/util";
import "./projects.css";

export default function ProjectCard({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [preview] = project.screenshots;
  const name = [project.code_url, project.playable_url]
    .find(url => url?.split('/').at(3))?.split("/").filter(Boolean).at(-1)
    ?.replace(/\.git$/i, "").replace(/[-_]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase())

  return (
    <article
      className={`card ${preview ? "" : "noPreview"}`}
      data-status={project.status}>
      <div className="content">
        <div className="details">
          <div className="header">
            <h2 className="name">{name}</h2>
            <p className="meta">
              <span className="status">
                {project.status}
              </span>
              <span className="separator">
                /
              </span>
              <span>{project.event}</span>
            </p>
          </div>

          <div className="actions">
            {project.status === "Approved" ? null : (
              <Link href={`/projects/${project.id}`}>
                Edit project
              </Link>
            )}
            {project.playable_url ? (
              <a href={project.playable_url} target="_blank" rel="noopener noreferrer">
                {new URL(project.playable_url).pathname.slice(1)}
              </a>
            ) : null}
            {project.code_url ? (
              <a href={project.code_url} target="_blank" rel="noopener noreferrer">
                {new URL(project.code_url).pathname.slice(1)}
              </a>
            ) : null}
          </div>
        </div>

        {preview ? (
          <div className="screenshots">
            {project.screenshots.slice(0, 5).map((shot, index) => (
              <button
                type="button"
                key={shot.url}
                onClick={() => setOpenIndex(index)}>
                <img src={shot.url} alt="" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {openIndex === null ? null : (
        <Carrousel
          images={project.screenshots.map(shot => shot.url)}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </article>
  );
}
