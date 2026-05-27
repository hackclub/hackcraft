import { NextResponse } from "next/server";
import {
  sendMessage,
  updateApprovedProjectField,
  verifySlackRequest,
} from "~/lib/api";

export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifySlackRequest(request, raw))
    return new NextResponse("Invalid Slack signature", { status: 401 });

  const payload = JSON.parse(new URLSearchParams(raw).get("payload")!);

  for (const action of payload.actions ?? []) {
    if (
      !(await updateApprovedProjectField(
        payload.user.id,
        action.action_id,
        action.value,
      ))
    )
      continue;

    sendMessage({
      channel: payload.user.id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Thanks, click the button to get some Minecraft style Hack Club stickers!",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Gib stickers!",
              emoji: true,
            },
            url: "https://hackcraft.hackclub.com/stickers",
          },
        },
      ],
    });
  }
  return new NextResponse();
}
