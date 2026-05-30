import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";
import { getAllProjects } from "~/lib/api";
import GalleryGrid from "./GalleryGrid";

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
