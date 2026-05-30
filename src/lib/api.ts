import Airtable, { Record } from "airtable";
import { FIELDS, getIdentity, Identity, Project } from "./util";
import crypto from "crypto";
import { redirect } from "next/navigation";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base("appROpbCKgNm7r5ln");
const submissions = base("tblx8k1fmPtQgDeUu");

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
        redirect_uri: `https://hackcraft.hackclub.com/api/${type}/callback`,
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
    if (
      !project ||
      project.slack_id !== ((await getIdentity())?.slack_id || "")
    )
      throw null;
    return project;
  } catch {
    redirect(
      "/error?title=Project not found&error=We could not find that project.",
    );
  }
}

export async function updateApprovedProjectField(
  slackId: string,
  field: "feedback" | "referral",
  value: string,
) {
  try {
    const [record] = await submissions
      .select({
        filterByFormula: `AND({${FIELDS.slackId}}="${slackId}",${FIELDS.status}="Approved")`,
      })
      .all();
    if (!record) return false;

    await record.patchUpdate({
      [field === "feedback" ? FIELDS.feedback : FIELDS.referral]: value,
    });

    return !!(
      (
        record.get(
          field === "feedback" ? FIELDS.referral : FIELDS.feedback,
        ) as string
      )?.trim().length > 0
    );
  } catch {
    return false;
  }
}

export async function getSubmissionsForUser(slackId: string, email: string) {
  const records = await submissions
    .select({
      filterByFormula: `OR({${FIELDS.slackId}}="${slackId}",{${FIELDS.email}}="${email}")`,
    })
    .all();

  return records.map(mapSubmissionRecord);
}

export async function saveProject({
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
      req.get(FIELDS.status) != "Approved" &&
      req.get(FIELDS.slackId) == identity.slack_id
    )
      await req.patchUpdate(data);
  }
}

export async function deleteProject(id: string, identity: Identity) {
  const req = await submissions.find(id);
  if (
    req &&
    req.get(FIELDS.status) == "Draft" &&
    req.get(FIELDS.slackId) == identity.slack_id
  )
    await req.destroy();
}

export async function getFormOptions() {
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
  try {
    const identity = await getIdentity();
    if (!identity?.slack_id) return false;

    const [record] = await submissions
      .select({
        filterByFormula: `AND({${FIELDS.slackId}}="${identity.slack_id}",{${FIELDS.status}}="Approved",NOT(${FIELDS.stickers}))`,
      })
      .all();
    if (!record) return false;

    const address = identity.addresses?.find(item => item.id === addressId);
    if (!address) return false;

    await record.patchUpdate({
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
  } catch {
    return false;
  }
}

export function verifySlackRequest(request: Request, rawBody: string) {
  if (!process.env.SLACK_SIGNING_SECRET) return false;

  const timestamp = request.headers.get("x-slack-request-timestamp");
  const sig = request.headers.get("x-slack-signature");
  if (!timestamp || !sig) return false;

  const tsNum = Number(timestamp);
  if (isNaN(tsNum) || Math.abs(Math.floor(Date.now() / 1000) - tsNum) > 60 * 5)
    return false;

  const hmac = crypto
    .createHmac("sha256", process.env.SLACK_SIGNING_SECRET!)
    .update(`v0:${timestamp}:${rawBody}`)
    .digest("hex");

  try {
    const a = Buffer.from(`v0=${hmac}`);
    const b = Buffer.from(sig);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (e) {
    return false;
  }
}

export function sendMessage(body: any) {
  return fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + process.env.SLACK_TOKEN,
    },
    body: JSON.stringify(body),
  });
}
