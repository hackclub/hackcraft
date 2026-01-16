import Link from "next/link";
import GalleryEntry from "~/components/GalleryEntry";
import TiledDiv from "~/components/TiledDiv";

const api_url =
  "https://api2.hackclub.com/v0.1/MC%20Modding/Submissions?select={%22filterByFormula%22:%22{Status}=%27Approved%27%22}";

export default async function GalleryPage() {
  const data = await fetch(api_url, { next: { revalidate: 60 } });
  const entries = await data.json();

  return (
    <>
      <TiledDiv background="grass" id="navbar">
        <Link className="back" href="/">
          back
        </Link>
        <h1>See what others made!</h1>
      </TiledDiv>
      <TiledDiv id="header" background="dirt">
        <div
          className="showcase"
          style={{ textAlign: "center", padding: "1em", width: "90%" }}>
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
      <TiledDiv id="footer" background="bedrock">
        <em className="player1 love">And the universe said I love you...</em>
        <p style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          Made with{" "}
          <img
            src="/images/dancing_parrot.gif"
            alt="minecraft parrot"
            title="A minecraft parrot"
            height="20px"
          />{" "}
          by <a href="https://hackclub.com">Hack Club</a>.
        </p>
      </TiledDiv>
    </>
  );
}
