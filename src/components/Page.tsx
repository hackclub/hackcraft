import Link from "next/link";
import SplashText from "./SplashText";
import TiledDiv from "./TiledDiv";

export default function Page(props: React.PropsWithChildren<{ back?: string; backText?: string }>) {
  return (
    <>
      <TiledDiv background="grass" id="navbar">
        {props.back ? (
          <Link className="back" href={props.back} prefetch={false}>
            {props.backText ?? "back"}
          </Link>
        ) : null}
        <div style={{ top: "5em", position: "relative" }}>
          <Link href="/">
            <img
              src="/images/logo.webp"
              fetchPriority="high"
              alt="Hackcraft"
              width={800}
              height={200}
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          <SplashText />
        </div>
      </TiledDiv>
      <main>
        {props.children}
      </main>
      <TiledDiv
        background="bedrock"
        element="footer"
        style={{
          paddingTop: "1em",
          textAlign: "center",
          backgroundRepeat: "repeat-x",
        }}>
        <em className="player1">And the universe said I love you...</em>
        <p style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          Made with{" "}
          <img
            src="/images/dancing_parrot.webp"
            alt="minecraft parrot"
            title="A minecraft parrot"
            width={20}
            height={20}
            loading="lazy"
          />{" "}
          by <a href="https://hackclub.com">Hack Club</a>.
        </p>
      </TiledDiv>
    </>
  );
}
