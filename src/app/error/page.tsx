import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; title?: string }>;
}) {
  const params = await searchParams;
  return (
    <Page back="/submit" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <h2>{params.title ?? "Something went wrong"}</h2>
          <p>{params.error ?? "An unknown error occurred"}</p>
        </div>
      </TiledDiv>
    </Page>
  );
}
