"use client";

import { useActionState, useMemo, useState } from "react";
import ImageUploader from "~/components/ImageUploader";
import { burstConfetti } from "~/lib/confetti";
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
  projects,
  action,
}: {
  id: string;
  project?: Project;
  projects: { name: string; total_seconds: number; languages: string[] }[];
  action: (
    prevState: { error?: string } | undefined,
    formData: FormData,
  ) => Promise<{ error?: string } | undefined>;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [values, setValues] = useState({
    code_url: "",
    playable_url: "",
    hackatime_projects: [] as Project["hackatime_projects"],
    event: undefined,
    prize: "none",
    hour_override: 0,
    description: "",
    notes: "",
    ...project,
    screenshots: project?.screenshots?.map(s => s.url) ?? [],
  });

  const [javaFilter, setJavaFilter] = useState(true);

  const getHours = (projectNames: string[]) =>
    projects
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

    const selectedProjects = projects.filter(project =>
      values.hackatime_projects.includes(project.name),
    );

    if (
      !/^https:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?:\/[^\/\s]+)+\/?$/.test(
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
      !/^https:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?:\/[^\/\s]+)+\/?$/.test(
        values.code_url,
      )
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
      .map(url => url.trim())
      .filter(Boolean);

    if (screenshotUrls.length === 0) {
      validation.screenshots.errors.push("Please add some screenshots.");
    } else if (screenshotUrls.length < 3) {
      validation.screenshots.warnings.push("Maybe some more?");
    }

    if (
      screenshotUrls.filter(
        url =>
          !/^https:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?:\/[^\/\s]+)+\/?$/.test(
            url,
          ) &&
          !/^data:image\/(png|jpeg|jpg|gif|webp|avif|bmp|svg\+xml);base64,/i.test(
            url,
          ),
      ).length > 0
    ) {
      validation.screenshots.errors.push("Invalid screenshots.");
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
      action={formAction}>
      <input type="hidden" name="id" value={id} />

      {state?.error && (
        <p
          style={{
            padding: "1rem",
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          {state.error}
        </p>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "100%" }}>
          <span className="header">Playable URL</span>
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
          <span className="header">Code URL</span>
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
        <span className="header">Description</span>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="header">Hackatime projects</span>
          <label>
            <input
              type="checkbox"
              checked={javaFilter}
              onChange={e => setJavaFilter(e.target.checked)}
            />
            Java only
          </label>
        </div>
        {!projects.some(
          project =>
            !javaFilter ||
            project.languages.some(lang => lang.toLowerCase() === "java"),
        ) ? (
          <p className="muted">No Hackatime projects found</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "1fr 1fr",
            }}>
            {projects.map(project => {
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
                    display:
                      javaFilter &&
                      !project.languages.some(
                        lang => lang.toLowerCase() === "java",
                      )
                        ? "none"
                        : "",
                    border: project.languages.some(
                      lang => lang.toLowerCase() === "java",
                    )
                      ? "2px solid rgba(255, 255, 255, 0.12)"
                      : "2px solid rgba(255, 224, 102, 0.3)",
                    background: checked
                      ? "rgba(37, 105, 242, 0.18)"
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

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "100%" }}>
          <span className="header">Hour override</span>
          <input
            name="hour_override"
            type="number"
            placeholder="Only set this when it is different from Hackatime! Make sure to declare why in notes"
            value={values.hour_override}
            onChange={e => updateField("hour_override", e.target.value)}
            aria-invalid={validation.hour_override.errors.length > 0}
          />
          <Validation validation={validation.hour_override} />
          <span className="muted">
            We don't judge based on hours but we still need this to be accurate
          </span>
        </div>

        <div style={{ width: "100%" }}>
          <span className="header">Event</span>
          <select
            name="event"
            value={values.event}
            onChange={e => updateField("event", e.target.value)}
            aria-invalid={validation.event.errors.length > 0}>
            <option value="" disabled>
              Select an event
            </option>
            {["Hackcraft V4", "The Great Download Challenge"].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Validation validation={validation.event} />
        </div>
      </div>

      <div>
        <span className="header">Screenshots</span>
        <ImageUploader
          value={values.screenshots}
          onChange={screenshots =>
            setValues(prev => ({ ...prev, screenshots }))
          }
        />
        <input
          type="hidden"
          name="screenshots"
          value={values.screenshots.join("\n")}
          aria-invalid={validation.screenshots.errors.length > 0}
        />
        <Validation validation={validation.screenshots} />
      </div>

      <div style={{ width: "100%", display: "contents" }}>
        <span className="header">Prize</span>
        <div
          style={{
            overflowX: "auto",
            display: "flex",

            gap: "1rem",
            padding: "0.5rem",
            width: "100%",
          }}>
          {[
            {
              title: "Minecraft License",
              description: "Block game 4 free!",
              image: "minecraft",
            },
            {
              title: "Nest Hosting (3 months)",
              description: "2 virtual cores, 4gb ram, 64gb storage",
              image: "nest1",
            },
            {
              title: "Nest Hosting (2 months)",
              description: "4 virtual cores, 8gb ram, 128gb storage",
              image: "nest2",
            },
            {
              title: "Grant for Servers (30$)",
              description: "find your own server!",
              image: "server",
            },
            {
              title: "Hytale",
              description: "Other block game??",
              image: "hytale",
            },
            {
              title: "800$ Computer Grant",
              description: "Only available if you did the previous events!",
              image: "computah",
            },
            {
              title: "none",
              description: "You will recieve: nothing",
              image: "404",
            },
          ]
            .map(prize => ({
              ...prize,
              selected: prize.title === values.prize,
            }))
            .map(prize => (
              <div
                key={prize.title}
                className="card"
                onClick={() => updateField("prize", prize.title)}
                style={{
                  width: "15rem",
                  flexShrink: 0,
                  textAlign: "left",
                  padding: "20px",

                  background: prize.selected ? "#1c1c1c" : "#171717",
                  border: prize.selected
                    ? "1px solid #fff"
                    : "2px solid #2c2c2c",

                  transform: prize.selected
                    ? "translateY(0px) scale(0.98)"
                    : "",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",

                  cursor: "pointer",

                  transition:
                    "transform .12s ease, border-color .12s ease, background .12s ease",
                }}>
                <img
                  className="muted"
                  style={{
                    paddingBottom: "10px",
                    border: "none",
                    borderBottom: "1px solid #262626",
                    height: "7.5rem",
                    objectFit: "cover",
                  }}
                  src={`/images/${prize.image}.webp`}
                  alt={prize.image}
                />

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                  }}>
                  {prize.title}
                </div>

                <div
                  className="muted"
                  style={{
                    lineHeight: 1.4,
                  }}>
                  {prize.description}
                </div>
              </div>
            ))}
        </div>
        <input name="prize" value={values.prize} hidden />
      </div>

      <div>
        <span className="header">Notes</span>
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
          }
          style={{ marginRight: "1rem" }}
          onClick={e => burstConfetti(e.clientX, e.clientY)}>
          Submit project
        </button>
        {id !== "new" && project?.status === "Draft" && (
          <button
            type="submit"
            name="intent"
            value="delete"
            onClick={e => {
              if (
                !confirm(
                  "Are you sure you want to delete this draft? This action cannot be undone.",
                )
              )
                e.preventDefault();
            }}>
            Delete draft
          </button>
        )}
      </div>
    </form>
  );
}
