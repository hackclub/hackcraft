import Link from "next/link";
import SplashText from "~/components/SplashText";
import TiledDiv from "~/components/TiledDiv";

export const revalidate = 60;

export default function Submit() {
  return (
    <>
      <Link className="back" href="/guide#2">
        back
      </Link>
      <TiledDiv background="grass" id="navbar">
        <div style={{ paddingTop: "10em", position: "relative" }}>
          <Link href="/">
            <img src="/images/logo.png" alt="Minecraft Logo" width="100%" />
          </Link>
          <SplashText />
        </div>
      </TiledDiv>
      <TiledDiv id="header" background="dirt">
        <div id="subtitle" style={{ fontSize: "1.2em", marginBottom: "5em" }}>
          <span>Submitting</span>
        </div>
        <div className="section">
          <h2>Before you submit</h2>
          <ul>
            <li>Make sure your mod is good :3</li>
            <li>
              Confirm that you did not make your mod nor your readme with AI.
            </li>
            <li>
              Test if your mod works properly on a server and outside of a
              development environment.
            </li>
            <li>Make sure your mod has the necessary 3 features.</li>
            <li>Check if your mod is survival-friendly.</li>
            <li>
              Ensure you are in #mc-modding so you can receive your prize.
            </li>
          </ul>
        </div>
      </TiledDiv>
      <TiledDiv background="cobblestone" style={{ padding: "1rem" }}>
        <div className="section">
          <div id="1" className="section-title">
            <h3>Publishing to GitHub</h3>
            <a href="#2" className="skip">
              skip
            </a>
          </div>
          <i style={{ fontSize: "1rem" }}>
            You are allowed to use another git provider, but we recommend
            GitHub.
          </i>
          <p>
            Go to Menu &gt; Git &gt; GitHub &gt; Share Project On GitHub,
            disable Private and Share, this should create a Git repo for you.
          </p>
          <img
            src="/images/share-on-github.png"
            alt="Share on GitHub"
            width="100%"
          />
          <p>
            If you ever need to update your mod click the "Commit" button on the
            left, select all changes, write a message and press "Commit and
            Push".
          </p>
        </div>
        <div className="section">
          <div id="2" className="section-title">
            <h3>Publishing to Modrinth</h3>
            <a href="#3" className="skip">
              skip
            </a>
          </div>
          <p>
            First we need to package our mod, in Intellij click on the gradle
            icon (the elephant) on the left of your screen and double click
            build to create a jar containing all your work.
          </p>
          <img src="/images/build.png" alt="Building the mod" width="100%" />
          <p>
            Go to <a href="https://modrinth.com/">Modrinth</a> and click the +
            in the top left (sign in if you haven't already) and create a new
            project. Modrinth already guides you through the process, but watch
            out for these common pitfalls to prevent getting your mod rejected:
          </p>
          <ul>
            <li>
              Make sure you have a lengthy and properly formatted description
              encapsulating all features (
              <a href="https://modrinth.com/mod/quark">good example</a>,{" "}
              <a href="https://modrinth.com/mod/entityculling">great example</a>
              )
            </li>
            <li>
              Make sure you have a functional GitHub repository/issues link.
            </li>
            <li>Check that your license matches the one on GitHub</li>
            <li>
              Make sure you selected the correct version range, 1.21.x is not
              real.
            </li>
            <li>
              Ensure you are using the correct environment, if you don't know
              what this means select "both"
            </li>
          </ul>
        </div>
      </TiledDiv>
      <TiledDiv background="deepslate" style={{ padding: "1rem" }}>
        <div className="section">
          <h2 id="3">Ready to submit?</h2>
          <div style={{ display: "flex" }}>
            <a
              className="hoverable"
              id="form-link"
              href="https://submit.hackclub.com/hackcraft"
              target="_blank">
              Submit Now!
            </a>
          </div>
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
