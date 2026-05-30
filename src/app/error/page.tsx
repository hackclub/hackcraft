"use client";
import { useSearchParams } from "next/navigation";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

export default function ErrorPage() {
  const params = useSearchParams();
  return (
    <Page back="/submit" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <h2>{params.get("title") ?? "Something went wrong"}</h2>
          <p>{params.get("error") ?? "An unknown error occurred"}</p>
        </div>
      </TiledDiv>
    </Page>
  );
}
