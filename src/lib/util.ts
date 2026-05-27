import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const FIELDS = {
  slackId: "Slack ID",
  codeUrl: "Code URL",
  playableUrl: "Playable URL",
  screenshots: "Screenshot",
  event: "Event",
  prize: "Prize",
  status: "Status",
  hackatimeProjects: "Hackatime",
  hourOverride: "Optional - Override Hours Spent",
  description: "Description",
  notes: "Notes",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  birthday: "Birthday",
  addressLine1: "Address (Line 1)",
  addressLine2: "Address (Line 2)",
  city: "City",
  state: "State / Province",
  postalCode: "ZIP / Postal Code",
  country: "Country",
  username: "Username",
  stickers: "Stickers",
  feedback: "How can we improve?",
  referral: "How did you hear about this?",
} as const;

export type Identity = {
  slack_id: string;
  primary_email: string;
  first_name: string;
  last_name: string;
  birthday?: string;
  ysws_eligible: boolean;
  verification_status: string;
  addresses?: {
    id: string;
    primary?: boolean;
    first_name?: string;
    last_name?: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  }[];
};

export type Project = {
  id: string;
  slack_id: string;
  code_url: string;
  playable_url: string;
  screenshots: { url: string }[];
  event?: string;
  prize?: string;
  status: string;
  hackatime_projects: string[];
  hour_override: number;
  description: string;
  notes: string;
};

export async function getAccessToken(type: "hca" | "hackatime") {
  const access_token = (await cookies()).get(`${type}_access_token`)?.value;
  if (!access_token)
    redirect(
      `https://${type == "hca" ? "auth" : type}.hackclub.com/oauth/authorize?client_id=${process.env[type.toUpperCase() + "_CLIENT_ID"]}&redirect_uri=https%3A%2F%2Fhackcraft.hackclub.com%2Fapi%2F${type}%2Fcallback&response_type=code&scope=${type == "hca" ? "name+email+slack_id+verification_status" : "profile+read"}`,
    );
  return access_token;
}

export async function getIdentity() {
  const { identity } = await fetch(`https://auth.hackclub.com/api/v1/me`, {
    headers: {
      Authorization: "Bearer " + (await getAccessToken("hca")),
    },
  }).then(r => r.json());

  return identity as Identity;
}
