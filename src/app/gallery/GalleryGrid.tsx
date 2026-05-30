"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Carrousel from "~/components/Carrousel";

export default function GalleryGrid({
  projects,
}: {
  projects: Awaited<ReturnType<typeof import("~/lib/api").getAllProjects>>;
}) {
  const [openProject, setOpenProject] = useState<{
    images: string[];
    projectUrl: string;
    codeUrl: string;
  } | null>(null);
  let [creator, setCreator] = useState<{
    displayName: string;
    imageUrl: string;
  } | null>(null);
  const [filter, setFilter] = useState("All");
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  function moveTooltip(e: React.MouseEvent) {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.left =
      Math.max(
        e.clientX +
          (e.clientX + tooltipRef.current.offsetWidth + 24 > window.innerWidth
            ? -tooltipRef.current.offsetWidth - 12
            : 12),
        0,
      ) + "px";
    tooltipRef.current.style.top =
      Math.max(
        Math.min(
          e.clientY + 12,
          window.innerHeight - tooltipRef.current.offsetHeight - 12,
        ),
        0,
      ) + "px";
  }

  const events = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach(p => {
      if (!p.event) return;
      counts.set(p.event, (counts.get(p.event) || 0) + 1);
    });
    const list = Array.from(counts.entries())
      .filter(([, count]) => count >= 3)
      .map(([name, count]) => ({ name, count }));
    return list;
  }, [projects]);

  const filtered = useMemo(() => {
    if (!filter || filter === "All") return projects;
    if (filter === "Other")
      return projects.filter(
        p => !p.event || !events.map(e => e.name).includes(p.event),
      );
    return projects.filter(p => p.event === filter);
  }, [projects, filter, events]);

  return (
    <>
      <div
        className="section"
        style={{
          maxWidth: "90vw",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            padding: ".35rem .6rem",
            borderRadius: "6px",
            width: "20rem",
          }}>
          <option value="All">All ({projects.length})</option>
          {events.map(ev => (
            <option key={ev.name} value={ev.name}>
              {ev.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        <div>
          <div className="muted">Showing {filtered.length} projects</div>
          <Link
            href="/gallery/old"
            style={{
              textDecoration: "none",
            }}>
            View old gallery
          </Link>
        </div>
      </div>

      <div
        className="section"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "10px",
          maxWidth: "90vw",
        }}>
        {filtered.map(project => (
          <div
            key={project.playable_url}
            className="project"
            onClick={() => {
              setOpenProject({
                images: project.screenshots,
                projectUrl: project.playable_url,
                codeUrl: project.code_url,
              });
              fetch("https://cachet.dunkirk.sh/users/" + project.slack_id)
                .then(res => res.json())
                .then(setCreator);
            }}
            onMouseEnter={e => {
              if (tooltipRef.current) return;
              const el = document.createElement("div");
              el.id = "minetip-tooltip";
              el.textContent = project.description;
              document.body.appendChild(el);

              tooltipRef.current = el;

              moveTooltip(e);
            }}
            onMouseMove={moveTooltip}
            onMouseLeave={() => {
              tooltipRef.current?.parentNode?.removeChild(tooltipRef.current);
              tooltipRef.current = null;
            }}>
            <img
              src={project.screenshots[0]}
              alt={project.playable_url}
              loading="lazy"
            />
            <div className="gallery-overlay muted">
              <span>{project.playable_url}</span>
            </div>
          </div>
        ))}
      </div>

      {openProject && (
        <>
          <Carrousel
            images={openProject.images}
            initialIndex={0}
            projectUrl={openProject.projectUrl}
            codeUrl={openProject.codeUrl}
            onClose={() => {
              setOpenProject(null);
              setCreator(null);
            }}
          />
          {creator && (
            <div
              style={{
                position: "fixed",
                top: "1rem",
                left: "1rem",
                zIndex: "1",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>
              <img
                src={creator?.imageUrl}
                style={{ width: "36px", borderRadius: "12px" }}
              />
              {creator?.displayName}
            </div>
          )}
        </>
      )}
    </>
  );
}
