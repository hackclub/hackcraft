import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "unknown" } = await searchParams;

  return (
    <Page back="/" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <h2>Not verified :(</h2>
          <p>Your verification status is {status}.</p>
        </div>
      </TiledDiv>
    </Page>
  );
}
