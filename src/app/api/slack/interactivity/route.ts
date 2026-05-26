import { NextResponse } from "next/server";
import { approvedProjects, FIELDS, sendMessage } from "~/lib/api";

export async function GET(request: Request) {
  const req = JSON.parse(
    new URLSearchParams(await request.text()).get("payload")!,
  );
  const record = await approvedProjects(req.user.id);
  req.actions?.forEach(action => {
    record[0].set(
      action.action_id == "feedback" ? FIELDS.feedback : FIELDS.referral,
      action.value,
    );
    if (
      (
        record[0].get(
          action.action_id != "feedback" ? FIELDS.feedback : FIELDS.referral,
        ) as string
      )?.trim().length > 0
    ) {
      sendMessage({
        channel: req.user.id,
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
  });
  return new NextResponse();
}
