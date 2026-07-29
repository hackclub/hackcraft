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
      code_url: { errors: [] as string[], warnings: [] as string[] },
      description: { errors: [] as string[], warnings: [] as string[] },
      hour_override: { errors: [] as string[], warnings: [] as string[] },
      hackatime_projects: { errors: [] as string[], warnings: [] as string[] },
      screenshots: { errors: [] as string[], warnings: [] as string[] },
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

    if (!HTTPS_URL_RE.test(values.code_url))
      validation.code_url.errors.push("Code URL must be a valid https URL.");

    if (values.description.length < 10) {
      validation.description.errors.push("Description should be at least 10 characters.");
    } else if (values.description.length > 500) {
      validation.description.warnings.push("Description should not exceed 500 characters.");
    } else if (
      values.description.toLowerCase().includes("installation instructions") ||
      values.description.toLowerCase().includes("license")
    ) {
      validation.description.warnings.push(
        "Please describe your project itself, this is not your readme.",
      );
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
      } else if (parsed < 3) {
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

    const screenshotUrls = values.screenshots.map(url => url.trim()).filter(Boolean);

    if (screenshotUrls.length === 0) {
      validation.screenshots.errors.push("Please add some screenshots.");
    } else if (screenshotUrls.length < 3) {
      validation.screenshots.warnings.push("Maybe some more?");
    }

    if (
      screenshotUrls.filter(
        url =>
          !(
            HTTPS_URL_RE.test(url) ||
            /^data:image\/(png|jpeg|jpg|gif|webp|avif|bmp|svg\+xml);base64,/i.test(url)
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
  }, [values, projects, getHours]);
}
