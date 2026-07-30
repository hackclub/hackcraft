"use client";

import Validation from "./Validation";

export function isJavaProject(project: { languages: string[] }) {
  return project.languages.some(lang => lang.toLowerCase() === "java");
}

export default function HackatimeProjectPicker({
  projects,
  javaFilter,
  onJavaFilterChange,
  selected,
  onToggle,
  hours,
  validation,
}: {
  projects: { name: string; total_seconds: number; languages: string[] }[];
  javaFilter: boolean;
  onJavaFilterChange: (checked: boolean) => void;
  selected: string[];
  onToggle: (name: string) => void;
  hours: number;
  validation: { errors: string[]; warnings: string[] };
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="header">Hackatime projects</span>
        <label>
          <input
            type="checkbox"
            checked={javaFilter}
            onChange={e => onJavaFilterChange(e.target.checked)}
          />
          Java only
        </label>
      </div>
      {projects.some(project => !javaFilter || isJavaProject(project)) ? (
        <div
          style={{
            display: "grid",
            gap: "0.5rem",
            gridTemplateColumns: "1fr 1fr",
          }}>
          {projects.map(project => {
            const checked = selected.includes(project.name);
            return (
              <button
                type="button"
                key={project.name}
                onClick={() => onToggle(project.name)}
                style={{
                  fontSize: "1rem",
                  padding: "0.75rem 1rem",
                  textAlign: "left",
                  display: javaFilter && !isJavaProject(project) ? "none" : "",
                  border: isJavaProject(project)
                    ? "2px solid rgba(255, 255, 255, 0.12)"
                    : "2px solid rgba(255, 224, 102, 0.3)",
                  background: checked ? "rgba(37, 105, 242, 0.18)" : "rgba(0, 0, 0, 0.18)",
                }}>
                <input
                  type="checkbox"
                  readOnly
                  tabIndex={-1}
                  style={{ width: "auto", marginRight: "0.75rem" }}
                  value={project.name}
                  checked={checked}
                />
                <span>{project.name}</span>
                <span className="muted" style={{ float: "right" }}>
                  {(project.total_seconds / 3600).toFixed(2)}h
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="muted">No Hackatime projects found</p>
      )}
      <input type="hidden" name="hackatime_projects" value={selected.join(",")} />
      <p className="muted" style={{ marginBottom: 0 }}>
        Selected projects total {hours.toFixed(2)}h
      </p>
      <Validation validation={validation} />
    </div>
  );
}
