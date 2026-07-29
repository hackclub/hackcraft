"use client";

import { useActionState, useCallback, useState } from "react";
import ImageUploader from "~/components/ImageUploader";
import { burstConfetti } from "~/lib/confetti";
import type { Project } from "~/lib/util";
import GuideModal from "./GuideModal";
import HackatimeProjectPicker from "./HackatimeProjectPicker";
import PrizePicker from "./PrizePicker";
import { useProjectValidation } from "./useProjectValidation";
import Validation from "./Validation";

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
  const [guide, setGuide] = useState<string | null>(id === "new" ? "checklist" : null);

  const getHours = useCallback(
    (projectNames: string[]) =>
      projects
        .filter(project => projectNames.includes(project.name))
        .reduce((sum, project) => sum + project.total_seconds, 0) / 3600,
    [projects],
  );
  const validation = useProjectValidation(values, projects, getHours);

  function updateField(name: string, value: string) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  const hours = getHours(values.hackatime_projects);

  return (
    <form
      className="section"
      style={{ width: "50%", display: "grid", gap: "1.5rem" }}
      action={formAction}>
      <input type="hidden" name="id" value={id} />

      {state?.error ? (
        <p
          style={{
            padding: "1rem",
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          {state.error}
        </p>
      ) : null}

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ width: "100%" }}>
          <span className="header">
            Playable URL
            <button type="button" className="help-icon" onClick={() => setGuide("modrinth")}>
              ?
            </button>
          </span>
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
          <span className="header">
            Code URL
            <button type="button" className="help-icon" onClick={() => setGuide("github")}>
              ?
            </button>
          </span>
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

      <HackatimeProjectPicker
        projects={projects}
        javaFilter={javaFilter}
        onJavaFilterChange={setJavaFilter}
        selected={values.hackatime_projects}
        onToggle={name => {
          const hackatimeProjects = values.hackatime_projects.includes(name)
            ? values.hackatime_projects.filter(n => n !== name)
            : [...values.hackatime_projects, name];
          if (Math.abs(hours - values.hour_override) < 0.5)
            updateField("hour_override", getHours(hackatimeProjects).toFixed(2));
          setValues(prev => ({ ...prev, hackatime_projects: hackatimeProjects }));
        }}
        hours={hours}
        validation={validation.hackatime_projects}
      />

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
            onChange={e => updateField("event", e.target.value)}>
            {["Hackcraft V4", "Atlas"].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className="header">Screenshots</span>
        <ImageUploader
          value={values.screenshots}
          onChange={screenshots => setValues(prev => ({ ...prev, screenshots }))}
        />
        <input
          type="hidden"
          name="screenshots"
          value={values.screenshots.join("\n")}
          aria-invalid={validation.screenshots.errors.length > 0}
        />
        <Validation validation={validation.screenshots} />
      </div>

      <PrizePicker selected={values.prize} onSelect={title => updateField("prize", title)} />

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
          : validation.totalWarnings > 0 && `${validation.totalWarnings} warning(s)`}
      </p>
      <div>
        <button type="submit" name="intent" value="draft" style={{ marginRight: "1rem" }}>
          Save as draft
        </button>
        <button
          type="submit"
          name="intent"
          value="submit"
          disabled={validation.totalErrors > 0}
          title={
            validation.totalErrors > 0 ? "Fix form errors before submitting" : "Submit project"
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
      <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
        Having trouble submitting here?{" "}
        <a href="https://submit.hackclub.com/hackcraft-ysws" target="_blank" rel="noreferrer">
          Use the old form
        </a>
        .
      </p>
      {guide ? <GuideModal guide={guide} onClose={() => setGuide(null)} /> : null}
    </form>
  );
}
