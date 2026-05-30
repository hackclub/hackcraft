"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

function ErrorMessage() {
  const params = useSearchParams();
  return (
    <>
      <h2>{params.get("title") ?? "Something went wrong"}</h2>
      <p>{params.get("error") ?? "An unknown error occurred"}</p>
    </>
  );
}

export default function ErrorPage() {
  return (
    <Page back="/submit" backText="home">
      <TiledDiv id="header" background="dirt">
        <div
          className="section"
          style={{
            border: "3px solid rgba(255, 85, 85, 0.6)",
            background: "rgba(18, 6, 6, 0.7)",
          }}>
          <Suspense>
            <ErrorMessage />
          </Suspense>
        </div>
      </TiledDiv>
    </Page>
  );
}
