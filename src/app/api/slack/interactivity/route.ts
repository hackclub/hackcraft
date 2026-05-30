import { NextResponse } from "next/server";
import {
  sendMessage,
  updateApprovedProjectField,
  verifySlackRequest,
} from "~/lib/api";

export async function POST(request: Request) {
  const raw = await request.text();
  try {
    if (!verifySlackRequest(request, raw))
      return new NextResponse("Invalid Slack signature", { status: 401 });

    const payload = JSON.parse(new URLSearchParams(raw).get("payload")!);

    for (const action of payload.actions ?? []) {
      if (action.action_id === "feedback")
        sendMessage({
          channel: "U07AGEVSTD2",
          text: action.value,
        });
      if (
        !(await updateApprovedProjectField(
          payload.user.id,
          action.action_id,
          action.value,
        ))
      )
        continue;

      await sendMessage({
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
  } catch (e: any) {
    await sendMessage({
      channel: "U07AGEVSTD2",
      text: `Error in Slack interactivity route: ${e} ${e.message}`,
    });
  }
  return new NextResponse();
}
