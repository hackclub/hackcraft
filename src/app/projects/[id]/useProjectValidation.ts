import { useMemo } from "react";

const HTTPS_URL_RE =
  /^https:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?:\/[^/\s]+)+\/?$/;

type FormValues = {
  code_url: string;
  playable_url: string;
  hackatime_projects: string[];
  hour_override: number;
  description: string;
  notes: string;
  screenshots: string[];
};

export function useProjectValidation(
  values: FormValues,
  projects: { name: string; total_seconds: number; languages: string[] }[],
  getHours: (projectNames: string[]) => number,
) {
  return useMemo(() => {
    const validation = {
      playable_url: { errors: [] as string[], warnings: [] as string[] },
      hour_override: { errors: [] as string[], warnings: [] as string[] },
      hackatime_projects: { errors: [] as string[], warnings: [] as string[] },
      notes: { errors: [] as string[], warnings: [] as string[] },
    };

    const selectedProjects = projects.filter(project =>
      values.hackatime_projects.includes(project.name),
    );

    if (!HTTPS_URL_RE.test(values.playable_url)) {
      validation.playable_url.errors.push("Playable URL must be a valid https URL.");
    } else if (!values.playable_url.startsWith("https://modrinth.com/")) {
      validation.playable_url.warnings.push("Modrinth is recommended.");
    }

    if (selectedProjects.length === 0)
      validation.hackatime_projects.errors.push("Please link at least one Hackatime project.");

    if (
      selectedProjects.some(
        project => !project.languages.some(lang => lang.toLowerCase() === "java"),
      )
    )
      validation.hackatime_projects.warnings.push(
        `${selectedProjects
          .filter(project => !project.languages.some(lang => lang.toLowerCase() === "java"))
          .map(project => project.name)
          .join(", ")} are not Java projects.`,
      );

    if (values.hour_override) {
      const parsed = Number(values.hour_override);
      if (parsed < 0) {
        validation.hour_override.errors.push("Hour override must be greater than 0.");
      } else if (parsed < 4) {
        validation.hour_override.warnings.push(
          "That hour count is quite low and unlikely to be approved.",
        );
      } else if (parsed > 100) {
        validation.hour_override.warnings.push(
          "That hour value seems high. Make sure it's correct.",
        );
      }

      if (!values.notes && Math.abs(parsed - getHours(values.hackatime_projects)) > 0.7) {
        validation.notes.errors.push(
          "Please explain in notes why the hour override is different from Hackatime.",
        );
      }
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
  }, [values, projects, getHours]);
}
