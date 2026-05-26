import Airtable, { Record } from "airtable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base("appROpbCKgNm7r5ln");
const submissions = base("tblx8k1fmPtQgDeUu");

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
  "use server";
  const access_token = (await cookies()).get(`${type}_access_token`)?.value;
  if (!access_token)
    redirect(
      `https://${type == "hca" ? "auth" : type}.hackclub.com/oauth/authorize?client_id=${process.env[type.toUpperCase() + "_CLIENT_ID"]}&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2F${type}%2Fcallback&response_type=code&scope=${type == "hca" ? "name+email+slack_id+verification_status" : "profile+read"}`,
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

function mapSubmissionRecord(record: Record<any>): Project {
  return {
    id: record.id,
    slack_id: record.get(FIELDS.slackId) as string,
    code_url: record.get(FIELDS.codeUrl) as string,
    playable_url: record.get(FIELDS.playableUrl) as string,
    screenshots:
      (record.get(FIELDS.screenshots) as { url: string }[] | undefined) ?? [],
    event: record.get(FIELDS.event) as string,
    prize: record.get(FIELDS.prize) as string,
    status: record.get(FIELDS.status) as string,
    hackatime_projects:
      (record.get(FIELDS.hackatimeProjects) as string)
        ?.split(",")
        .filter(Boolean) ?? [],
    hour_override: parseInt(record.get(FIELDS.hourOverride) as string) || 0,
    description: record.get(FIELDS.description) as string,
    notes: record.get(FIELDS.notes) as string,
  };
}

export function exchangeCodeForToken(
  type: "hca" | "hackatime",
  code: string,
): Promise<string> {
  return fetch(
    `https://${type == "hca" ? "auth" : type}.hackclub.com/oauth/token`,
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env[type.toUpperCase() + "_CLIENT_ID"]!,
        client_secret: process.env[type.toUpperCase() + "_CLIENT_SECRET"]!,
        redirect_uri: `https://localhost:3000/api/${type}/callback`,
        code,
        grant_type: "authorization_code",
      }),
    },
  )
    .then(r => r.json())
    .then(res => res.access_token);
}

export async function getRecord(rec: string): Promise<Project | undefined> {
  try {
    const project = mapSubmissionRecord(await submissions.find(rec));
    if (project.slack_id !== ((await getIdentity())?.slack_id || ""))
      return undefined;
    return project;
  } catch {
    return undefined;
  }
}

export function approvedProjects(slackId: string) {
  return submissions
    .select({
      filterByFormula: `AND({${FIELDS.slackId}}="${slackId}",${FIELDS.status}="Approved")`,
    })
    .all();
}

export async function getSubmissions(slackId: string, email: string) {
  const records = await submissions
    .select({
      filterByFormula: `OR({${FIELDS.slackId}}="${slackId}",{${FIELDS.email}}="${email}")`,
    })
    .all();

  return records.map(mapSubmissionRecord);
}

export async function saveProjectSubmission({
  id,
  identity,
  data,
}: {
  id: string;
  identity: Identity;
  data: any;
}) {
  if (id == "new") await submissions.create(data);
  else {
    const req = await submissions.find(id);
    if (
      req.get(FIELDS.status) != "Approved" ||
      req.get(FIELDS.slackId) == identity.slack_id
    )
      await req.patchUpdate(data);
  }
}

export async function getSubmissionFormFields() {
  const fields = await fetch(
    "https://api.airtable.com/v0/meta/bases/appROpbCKgNm7r5ln/tables",
    {
      headers: {
        Authorization: "Bearer " + process.env.AIRTABLE_API_KEY,
      },
      next: { revalidate: 86400 },
    },
  )
    .then(r => r.json())
    .then(
      data =>
        data.tables.find((table: any) => table.id === "tblx8k1fmPtQgDeUu")
          ?.fields ?? [],
    );

  return {
    events:
      fields
        .find((field: any) => field.name === FIELDS.event)
        ?.options?.choices.map((choice: any) => choice.name)
        .filter((name: string) => !name.startsWith("!")) ?? [],
    prizes:
      fields
        .find((field: any) => field.name === FIELDS.prize)
        ?.options?.choices.map((choice: any) => choice.name)
        .filter((name: string) => !name.startsWith("!")) ?? [],
  };
}

export async function claimStickers(addressId: string) {
  const identity = await getIdentity();
  const [project] = await approvedProjects(identity.slack_id);
  if (!project) return false;

  const address = identity.addresses?.find(item => item.id === addressId);
  if (!address) return false;

  await project.patchUpdate({
    [FIELDS.firstName]: address.first_name,
    [FIELDS.lastName]: address.last_name,
    [FIELDS.addressLine1]: address.line_1,
    [FIELDS.addressLine2]: address.line_2,
    [FIELDS.city]: address.city,
    [FIELDS.state]: address.state,
    [FIELDS.postalCode]: address.postal_code,
    [FIELDS.country]: address.country,
    [FIELDS.stickers]: true,
  });

  return true;
}

export async function getUsername(id: string) {
  try {
    const user = await base("RSVPs").find(id);
    return (user.fields[FIELDS.username] as string) || null;
  } catch {
    return null;
  }
}

export function sendMessage(body: any) {
  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + process.env.SLACK_TOKEN,
    },
    body: JSON.stringify(body),
  });
}
