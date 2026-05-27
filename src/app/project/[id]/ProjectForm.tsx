"use client";

import { useMemo, useState } from "react";
import { Project } from "~/lib/util";

function Validation({
  validation,
}: {
  validation: { errors: string[]; warnings: string[] };
}) {
  return (
    <>
      {validation.errors.map(message => (
        <p
          key={message}
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.85rem",
            color: "#ff8080",
          }}>
          {message}
        </p>
      ))}
      {validation.warnings.map(message => (
        <p
          key={message}
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.85rem",
            color: "#ffe066",
          }}>
          {message}
        </p>
      ))}
    </>
  );
}

export default function ProjectForm({
  id,
  project,
  fields,
  action,
}: {
  id: string;
  project?: Project;
  fields: {
    events: string[];
    prizes: string[];
    projects: { name: string; total_seconds: number; languages: string[] }[];
  };
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [values, setValues] = useState({
    code_url: "",
    playable_url: "",
    hackatime_projects: [] as Project["hackatime_projects"],
    event: undefined,
    prize: undefined,
    hour_override: 0,
    description: "",
    notes: "",
    ...project,
    screenshots: project?.screenshots?.map(s => s.url).join("\n") ?? "",
  });

  const getHours = (projectNames: string[]) =>
    fields.projects
      .filter(project => projectNames.includes(project.name))
      .reduce((sum, project) => sum + project.total_seconds, 0) / 3600;
  const validation = useMemo(() => {
    const validation = {
      playable_url: { errors: [] as string[], warnings: [] as string[] },
      code_url: { errors: [] as string[], warnings: [] as string[] },
      description: { errors: [] as string[], warnings: [] as string[] },
      hour_override: { errors: [] as string[], warnings: [] as string[] },
      event: { errors: [] as string[], warnings: [] as string[] },
      prize: { errors: [] as string[], warnings: [] as string[] },
      hackatime_projects: { errors: [] as string[], warnings: [] as string[] },
      screenshots: { errors: [] as string[], warnings: [] as string[] },
      notes: { errors: [] as string[], warnings: [] as string[] },
    };

    const selectedProjects = fields.projects.filter(project =>
      values.hackatime_projects.includes(project.name),
    );

    if (
      !/^https:\/\/(\S{1,256}\.){1,}\S{2,6}(\/\S+)+\/?$/.test(
        values.playable_url,
      )
    ) {
      validation.playable_url.errors.push(
        "Playable URL must be a valid https URL.",
      );
    } else if (!values.playable_url.startsWith("https://modrinth.com/")) {
      validation.playable_url.warnings.push("Modrinth is recommended.");
    }

    if (
      !/^https:\/\/(\S{1,256}\.){1,}\S{2,6}(\/\S+)+\/?$/.test(values.code_url)
    )
      validation.code_url.errors.push("Code URL must be a valid https URL.");

    if (values.description.length < 10) {
      validation.description.errors.push(
        "Description should be at least 10 characters.",
      );
    } else if (values.description.length > 500) {
      validation.description.warnings.push(
        "Description should not exceed 500 characters.",
      );
    } else if (
      values.description.toLowerCase().includes("installation instructions") ||
      values.description.toLowerCase().includes("license")
    ) {
      validation.description.warnings.push(
        "Please describe your project itself, this is not your readme.",
      );
    }

    if (!values.event) validation.event.errors.push("Please select an event.");

    if (selectedProjects.length === 0)
      validation.hackatime_projects.errors.push(
        "Please link at least one Hackatime project.",
      );

    if (
      selectedProjects.some(
        project =>
          !project.languages.some(lang => lang.toLowerCase() === "java"),
      )
    )
      validation.hackatime_projects.warnings.push(
        selectedProjects
          .filter(
            project =>
              !project.languages.some(lang => lang.toLowerCase() === "java"),
          )
          .map(project => project.name)
          .join(", ") + " are not Java projects.",
      );

    if (values.hour_override) {
      const parsed = Number(values.hour_override);
      if (parsed < 0) {
        validation.hour_override.errors.push(
          "Hour override must be greater than 0.",
        );
      } else if (parsed < 3) {
        validation.hour_override.warnings.push(
          "That hour count is quite low and unlikely to be approved.",
        );
      } else if (parsed > 100) {
        validation.hour_override.warnings.push(
          "That hour value seems high. Make sure it's correct.",
        );
      }

      if (
        !values.notes &&
        Math.abs(parsed - getHours(values.hackatime_projects)) > 0.7
      ) {
        validation.notes.errors.push(
          "Please explain in notes why the hour override is different from Hackatime.",
        );
      }
    }

    const screenshotUrls = values.screenshots
      .split("\n")
      .map(url => url.trim())
      .filter(Boolean);

    if (screenshotUrls.length === 0) {
      validation.screenshots.errors.push("Please upload some screenshots");
    }

    if (
      screenshotUrls.filter(
        url => !/^https:\/\/(\S{1,256}\.){1,}\S{2,6}(\/\S+)+\/?$/.test(url),
      ).length > 0
    ) {
      validation.screenshots.errors.push(
        "Each screenshot URL must be a valid https URL.",
      );
    }

    return {
      ...validation,
      totalErrors: Object.values(validation).reduce(
        (count, { errors }) => count + errors.length,
        0,
      ),
      totalWarnings: Object.values(validation).reduce(
        (count, { warnings }) => count + warnings.length,
        0,
      ),
    };
  }, [values]);

  function updateField(name: string, value: string) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form
      className="section"
      style={{ width: "50%", display: "grid", gap: "1.5rem" }}
      action={action}>
      <input type="hidden" name="id" value={id} />

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "100%" }}>
          <label>Playable URL</label>
          <input
            name="playable_url"
            type="url"
            placeholder="https://modrinth.com/mod/your-mod"
            value={values.playable_url}
            onChange={e => updateField("playable_url", e.target.value)}
            aria-invalid={validation.playable_url.errors.length > 0}
          />
          <Validation validation={validation.playable_url} />
        </div>
        <div style={{ width: "100%" }}>
          <label>Code URL</label>
          <input
            name="code_url"
            type="url"
            placeholder="https://github.com/you/project"
            value={values.code_url}
            onChange={e => updateField("code_url", e.target.value)}
            aria-invalid={validation.code_url.errors.length > 0}
          />
          <Validation validation={validation.code_url} />
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          placeholder="What does it do? What is fun about it?"
          value={values.description}
          onChange={e => updateField("description", e.target.value)}
          aria-invalid={validation.description.errors.length > 0}
        />
        <Validation validation={validation.description} />
      </div>

      <div>
        <label>Hackatime projects</label>
        {fields.projects.length === 0 ? (
          <p className="muted">No Hackatime projects found</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "1fr 1fr",
            }}>
            {fields.projects.map(project => {
              const checked = values.hackatime_projects.includes(project.name);
              return (
                <span
                  key={project.name}
                  onClick={() => {
                    const hackatime_projects =
                      values.hackatime_projects.includes(project.name)
                        ? values.hackatime_projects.filter(
                            name => name !== project.name,
                          )
                        : [...values.hackatime_projects, project.name];
                    if (
                      Math.abs(
                        getHours(values.hackatime_projects) -
                          values.hour_override,
                      ) < 0.5
                    )
                      updateField(
                        "hour_override",
                        getHours(hackatime_projects).toFixed(2),
                      );
                    setValues(prev => ({ ...prev, hackatime_projects }));
                  }}
                  style={{
                    fontSize: "1rem",
                    padding: "0.75rem 1rem",
                    border: project.languages.some(
                      lang => lang.toLowerCase() === "java",
                    )
                      ? "2px solid rgba(255, 255, 255, 0.12)"
                      : "2px solid rgba(255, 224, 102, 0.3)",
                    background: checked
                      ? "rgba(79, 139, 255, 0.18)"
                      : "rgba(0, 0, 0, 0.18)",
                    cursor: "pointer",
                  }}>
                  <input
                    type="checkbox"
                    readOnly
                    style={{ width: "auto", marginRight: "0.75rem" }}
                    value={project.name}
                    checked={checked}
                  />
                  <span>{project.name}</span>
                  <span className="muted" style={{ float: "right" }}>
                    {(project.total_seconds / 3600).toFixed(2)}h
                  </span>
                </span>
              );
            })}
          </div>
        )}
        <input
          type="hidden"
          name="hackatime_projects"
          value={values.hackatime_projects.join(",")}
        />
        <p className="muted" style={{ marginBottom: 0 }}>
          Selected projects total{" "}
          {getHours(values.hackatime_projects).toFixed(2)}h
        </p>
        <Validation validation={validation.hackatime_projects} />
      </div>

      <div style={{ width: "100%" }}>
        <label>Hour override</label>
        <input
          name="hour_override"
          type="number"
          placeholder="Only set this when it is different from Hackatime! Make sure to declare why in notes"
          value={values.hour_override}
          onChange={e => updateField("hour_override", e.target.value)}
          aria-invalid={validation.hour_override.errors.length > 0}
        />
        <Validation validation={validation.hour_override} />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "100%" }}>
          <label>Event</label>
          <select
            name="event"
            value={values.event}
            onChange={e => updateField("event", e.target.value)}
            aria-invalid={validation.event.errors.length > 0}>
            <option value="" disabled>
              Select an event
            </option>
            {fields.events.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Validation validation={validation.event} />
        </div>
        <div style={{ width: "100%" }}>
          <label>Prize</label>
          <select
            name="prize"
            value={values.prize}
            onChange={e => updateField("prize", e.target.value)}>
            <option value="">Select a prize</option>
            {fields.prizes.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Screenshots</label>
        <textarea
          name="screenshots"
          placeholder="Paste image URLs, one per line"
          value={values.screenshots}
          onChange={e => updateField("screenshots", e.target.value)}
          aria-invalid={validation.screenshots.errors.length > 0}
        />
        <Validation validation={validation.screenshots} />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          name="notes"
          placeholder="For review/fullfillment/hour count/..."
          value={values.notes}
          onChange={e => updateField("notes", e.target.value)}
        />
        <Validation validation={validation.notes} />
      </div>

      <p className="muted" style={{ margin: 0 }}>
        {validation.totalErrors > 0
          ? `${validation.totalErrors} error(s), ${validation.totalWarnings} warning(s)`
          : validation.totalWarnings > 0 &&
            `${validation.totalWarnings} warning(s)`}
      </p>
      <div>
        <button
          type="submit"
          name="intent"
          value="draft"
          style={{ marginRight: "1rem" }}>
          Save as draft
        </button>
        <button
          type="submit"
          name="intent"
          value="submit"
          disabled={validation.totalErrors > 0}
          title={
            validation.totalErrors > 0
              ? "Fix form errors before submitting"
              : "Submit project"
          }>
          Submit project
        </button>
      </div>
    </form>
  );
}
