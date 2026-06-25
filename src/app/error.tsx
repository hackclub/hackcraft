"use client";

import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Page back="/" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <h2>Something went wrong</h2>
          <p>{error.message || "An unknown error occurred"}</p>
        </div>
      </TiledDiv>
    </Page>
  );
}
