import type { Metadata } from "next";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";
import { getAllProjects } from "~/lib/api";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Check out the Minecraft mods and shaders teens have built for Hackcraft.",
};

export default async function GalleryPage() {
  const projects = await getAllProjects();

  return (
    <Page back="/">
      <TiledDiv id="header" background="dirt">
        <GalleryGrid projects={projects} />
      </TiledDiv>
    </Page>
  );
}
