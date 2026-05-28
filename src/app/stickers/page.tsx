import { redirect } from "next/navigation";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";
import { claimStickers } from "~/lib/api";
import { getIdentity } from "~/lib/util";

export default async function Stickers(props: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const identity = await getIdentity();

  //todo add sticker image
  return (
    <Page>
      <TiledDiv id="header" background="dirt">
        {(await props.searchParams).success ? (
          (await props.searchParams).success == "true" ? (
            <div
              className="section"
              style={{
                border: "3px solid rgba(85, 255, 85, 0.6)",
              }}>
              <h2>Success!</h2>
              <p>
                Your stickers should be on their way! Check{" "}
                <a href="https://mail.hackclub.com">mail.hackclub.com</a> to
                track the delivery.
              </p>
            </div>
          ) : (
            <div
              className="section"
              style={{
                border: "3px solid rgba(255, 85, 85, 0.6)",
                background: "rgba(18, 6, 6, 0.7)",
              }}>
              <h2>Not eligible</h2>
              <p>
                It seems like you have no approved projects with unclaimed
                stickers. If you think this is a mistake, please tell us in
                #mc-modding.
              </p>
            </div>
          )
        ) : (
          <div className="section" style={{ width: "50%" }}>
            <form
              action={async (formData: FormData) => {
                "use server";

                redirect(
                  "/stickers?success=" +
                    (await claimStickers(formData.get("address") as string)),
                );
              }}>
              <h2>Want some stickers?</h2>
              <select name="address" id="address" required>
                {identity.addresses?.map(({ id, line_1, city }, i) => (
                  <option key={i} value={id}>
                    {line_1} {city}
                  </option>
                ))}
              </select>
              <button type="submit" style={{ marginTop: "1rem" }}>
                Send them off!
              </button>
            </form>
          </div>
        )}
      </TiledDiv>
    </Page>
  );
}
