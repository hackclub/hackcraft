import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

export default function NotFound() {
  return (
    <Page back="/" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <h2>Not found</h2>
          <p>The page you were looking for doesn't exist. :(</p>
        </div>
      </TiledDiv>
    </Page>
  );
}
