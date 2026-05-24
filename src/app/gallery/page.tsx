import Link from "next/link";
import GalleryEntry from "~/components/GalleryEntry";
import Page from "~/components/Page";
import TiledDiv from "~/components/TiledDiv";

//TODO table changed, merge data
// Maybe a full grid redesign would be better?
const api_url =
  "https://api2.hackclub.com/v0.1/MC%20Modding/Submissions?select={%22filterByFormula%22:%22{Status}=%27Approved%27%22}";

export default async function GalleryPage() {
  const data = await fetch(api_url, { next: { revalidate: 60 } });
  const entries = await data.json();

  return (
    <Page>
      <TiledDiv id="header" background="dirt">
        <h1 style={{ textAlign: "center" }}>See what others made!</h1>
        <div
          className="showcase"
          style={{
            textAlign: "center",
            padding: "1em",
            width: "90%",
            display: "block",
            overflow: "hidden",
          }}>
          {Array.isArray(entries) ? (
            entries
              .sort(() => Math.random() - 0.5)
              .map((data, index) => (
                <GalleryEntry key={index} info={data["fields"]} />
              ))
          ) : (
            <p>No entries available at this time.</p>
          )}
        </div>
      </TiledDiv>
    </Page>
  );
}
