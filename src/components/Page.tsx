import Link from "next/link";
import TiledDiv from "./TiledDiv";
import SplashText from "./SplashText";

export default function Page(
  props: React.PropsWithChildren<{ back?: string; backText?: string }>,
) {
  return (
    <>
      <TiledDiv background="grass" id="navbar">
        {props.back && (
          <Link className="back" href={props.back}>
            {props.backText ?? "back"}
          </Link>
        )}
        <div style={{ top: "5em", position: "relative" }}>
          <Link href="/">
            <img src="/images/logo.png" alt="Minecraft Logo" width="100%" />
          </Link>
          <SplashText />
        </div>
      </TiledDiv>
      {props.children}
      <TiledDiv
        background="bedrock"
        style={{
          paddingTop: "1em",
          textAlign: "center",
          backgroundRepeat: "repeat-x",
        }}>
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
