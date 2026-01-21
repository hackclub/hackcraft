"use client";
import SplashText from "~/components/SplashText";
import Link from "next/link";
import TiledDiv from "~/components/TiledDiv";

const featuredMods = [
  "https://github.com/MelnCat/IncompleteCombustion",
  "https://modrinth.com/mod/cameratweaks",
  "https://modrinth.com/mod/2d-minecraft",
  "https://modrinth.com/mod/omnilook",
  "https://modrinth.com/mod/extra-ores-items",
  "https://modrinth.com/mod/magic-craft",
  "https://modrinth.com/mod/farmers-delight-kacchi",
  "https://modrinth.com/mod/portal-gun-mod",
  "https://modrinth.com/mod/skibidi-brainrot-mod",
  "https://modrinth.com/mod/villager-tower-mod",
  "https://modrinth.com/mod/night-vision-revamp",
  "https://modrinth.com/mod/skillsmod",
  "https://modrinth.com/mod/nuggetmod",
  "https://modrinth.com/mod/abyssium",
  "https://modrinth.com/mod/namemanager",
  "https://modrinth.com/mod/simplespotifycontroller",
  "https://modrinth.com/mod/mc-death-note-mod",
  "https://modrinth.com/mod/snowball-hole-filler",
  "https://modrinth.com/mod/not-apples",
  "https://modrinth.com/mod/big-ships",
  "https://modrinth.com/mod/player-pearls",
  "https://modrinth.com/mod/schrodingers-chest",
  "https://modrinth.com/mod/chrono-domain",
  "https://modrinth.com/mod/nibbles-deep-dark",
  "https://modrinth.com/mod/js-turret",
  "https://modrinth.com/mod/tecnogui",
  "https://modrinth.com/mod/aviros",
  "https://modrinth.com/mod/eatermod",
  "https://modrinth.com/mod/planecraft",
  "https://modrinth.com/mod/magic-wands",
  "https://modrinth.com/mod/onomatopoeia",
  "https://modrinth.com/mod/lets-go-gambling!",
  "https://modrinth.com/mod/simpleedits",
  "https://modrinth.com/mod/wakatime-mod",
  "https://modrinth.com/mod/mc-game-of-life-sim",
  "https://modrinth.com/mod/ferret-friends",
  "https://modrinth.com/plugin/voteupdate",
  "https://modrinth.com/mod/quick-f3",
  "https://modrinth.com/mod/echoes-of-time",
  "https://modrinth.com/mod/potato-perks",
  "https://modrinth.com/mod/server-playtime-manager",
  "https://modrinth.com/mod/explorie",
  "https://modrinth.com/mod/rainbow-wood",
  "https://modrinth.com/mod/chatdebug",
  "https://modrinth.com/plugin/world-border-expansion",
  "https://modrinth.com/mod/tecnomap",
  "https://modrinth.com/plugin/command-reporter",
  "https://modrinth.com/mod/railcraft",
  "https://modrinth.com/mod/gateway",
  "https://modrinth.com/plugin/mcgambling",
  "https://modrinth.com/mod/minecraft-rivals",
  "https://modrinth.com/mod/arsenal-and-anvil",
  "https://modrinth.com/mod/enderchestheadsup",
  "https://modrinth.com/mod/project-gorilla",
  "https://modrinth.com/mod/divinetowers",
  "https://modrinth.com/mod/studycraft",
  "https://modrinth.com/mod/chronoelegy",
  "https://modrinth.com/mod/mwhrd",
];

export default function HomePage() {
  return (
    <>
      <a
        className="event"
        href="https://hackclub.slack.com/archives/C07NQ5QAYNQ/p1769001218794009"
        style={{ textDecoration: "none" }}>
        <b>Mobbin</b>
        <span>Ship a mob, get merch!</span>
        <i style={{ fontSize: "medium" }}>21 Jan - 11 Feb</i>
        <svg
          style={{ position: "absolute", top: "0.25em", right: "0.5em" }}
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="1.414"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32">
          <path d="M18.6696 18.2544C18.6196 18.8044 19.025 19.2908 19.575 19.3408C20.125 19.3908 20.6114 18.9855 20.6614 18.4355L20.6615 18.4338C21.0797 16.5772 21.0797 15.163 20.8286 12.6612C20.7628 12.2869 20.6485 11.9033 20.3726 11.6274C20.0967 11.3515 19.7131 11.2372 19.3387 11.1714C16.8371 10.9203 15.4229 10.9203 13.5651 11.3385C13.0263 11.4598 12.6092 11.875 12.6592 12.425C12.7092 12.975 13.1956 13.3804 13.7456 13.3304L13.9557 13.3114C15.4442 13.1765 16.3383 13.0955 17.4922 13.0936L17.4937 13.0951L12.053 18.5358C11.6625 18.9264 11.6625 19.5595 12.053 19.9501C12.4435 20.3406 13.0767 20.3406 13.4672 19.9501L18.9054 14.5119C18.9021 15.6445 18.8229 16.5339 18.6979 17.9365L18.6696 18.2544Z" />
          <path d="M26 16C26 24 24 26 16 26C8 26 6 24 6 16C6 8 8 6 16 6C24 6 26 8 26 16ZM24 16C24 20.014 23.45 21.722 22.586 22.586C21.722 23.45 20.014 24 16 24C11.986 24 10.278 23.45 9.414 22.586C8.55 21.722 8 20.014 8 16C8 11.986 8.55 10.278 9.414 9.414C10.278 8.55 11.986 8 16 8C20.014 8 21.722 8.55 22.586 9.414C23.45 10.278 24 11.986 24 16Z" />
        </svg>
      </a>
      <TiledDiv background="grass" id="navbar">
        <div style={{ top: "5em", position: "relative" }}>
          <img src="/images/logo.png" alt="Minecraft Logo" width="100%" />
          <SplashText />
        </div>
      </TiledDiv>
      <TiledDiv id="header" background="dirt">
        <div id="subtitle" style={{ fontSize: "1.2em" }}>
          <span>Ship a mod</span>
          <span>Get Minecraft</span>
        </div>
        <div style={{ paddingTop: "1em", paddingBottom: "7.5em" }}>
          <Link
            style={{
              margin: "3px",
            }}
            href="/guide">
            <button className="hoverable">Tutorial</button>
          </Link>
          <Link
            style={{
              margin: "3px",
            }}
            href="/gallery">
            <button className="hoverable">Gallery</button>
          </Link>
          <Link
            style={{
              margin: "3px",
            }}
            href="/guide/submit">
            <button className="hoverable">Submit</button>
          </Link>
        </div>
      </TiledDiv>
      <TiledDiv background="cobblestone">
        <div className="grid-steps" style={{ padding: "1em" }}>
          <div
            className="item-step hoverable"
            style={{ backgroundImage: "url(/images/code.png)" }}>
            <div className="mc-number">1</div>
            <p className="item-text">Make a mod</p>
          </div>
          <div
            className="item-step hoverable"
            style={{ backgroundImage: "url(/images/time.png)" }}>
            <div className="mc-number">2</div>
            <p className="item-text">Track time</p>
          </div>
          <div
            className="item-step hoverable"
            style={{ backgroundImage: "url(/images/modrinth.png)" }}>
            <div className="mc-number">3</div>
            <p className="item-text">Publish it on Modrinth</p>
          </div>
          <div
            className="item-step hoverable"
            style={{ backgroundImage: "url(/images/shop.png)" }}>
            <div className="mc-number">4</div>
            <p className="item-text">Get Minecraft!</p>
          </div>
        </div>
      </TiledDiv>
      <TiledDiv background="deepslate">
        <div style={{ padding: "1em" }}>
          <div className="section">
            <h2 className="player1">I see the game you mean.</h2>
            <p className="player2">Minecraft?</p>
            <p className="player1">
              Yes. Take care. The player is ready to reach a higher level in it,
              they may soon see the code.
            </p>
            <p className="player2">
              They read our thoughts like they were code on a screen. All they
              need to do is reach out and make changes.
            </p>
            <p className="player1">
              Change the code, and change the universe. You can do whatever you
              want. There&apos;s unlimited freedom.
            </p>
            <p className="player2">Go out and make something cool.</p>
            <p className="player1">
              Join others as they create their own universes.
            </p>
            <div
              onClick={() =>
                open(
                  featuredMods[Math.floor(Math.random() * featuredMods.length)],
                  "_blank",
                )
              }
              style={{ cursor: "pointer", textDecoration: "underline" }}>
              just like these mods.
            </div>
            <h3>Check out the mods teens made last time!</h3>
            <video controls src="/video.mp4" width="100%" />
            <h3>Craft a mod...</h3>
            <p>
              Never made a mod? It's the perfect time to build one. For
              inspiration, check out{" "}
              <Link href="/gallery" target="_blank">
                the gallery
              </Link>{" "}
              or{" "}
              <a
                href="https://discord.com/channels/507304429255393322/1079906503076626573"
                target="_blank">
                Fabric's Discord
              </a>
              !
            </p>
            <p>
              More of a social coder? You can also{" "}
              <a href="https://hackclub.com/slack?event=HackCraft">
                hang out online with other high schoolers
              </a>{" "}
              learning to build their first mods.
            </p>
            <h3>Place the blocks...</h3>
            <p>
              Create at least 3 features for your mod. A feature is a functional
              thing written in code that does something interesting in the game
              (at least 5 lines of code, JSON does not count). This can be a
              mixin, an item/block interaction, entity AI, rendering code, you
              name it! You can only count every feature once, so creating
              multiple items with similar features will only count as one
              feature. Anything you got from a tutorial or vanilla does{" "}
              <b>not</b> count.
            </p>
            <h3>Get the game...</h3>
            <p>
              Publish your mod to the blocky world on{" "}
              <a href="https://modrinth.com" target="_blank">
                Modrinth
              </a>{" "}
              and share your source code to a platform like{" "}
              <a href="https://github.com/">GitHub</a> to get stickers and a
              game like minecraft or hytale or a server. On top of that if you
              get 200 downloads in the first month, you get{" "}
              <a href="https://www.terraria.org/">Terraria</a> for free!
            </p>
            <h2>FAQ</h2>
            <h4>- How much time do I need to spend on my mod?</h4>
            <p>
              Doesn't matter, as long as you have at least 3 features!
              <br />
              <b>You still need Hackatime tho!</b>
            </p>
            <h4>- Do I need Minecraft for this YSWS?</h4>
            <p>
              No, you don't need an account to create a mod and you can get one
              after!
            </p>
            <h4>- Can I submit an old mod?</h4>
            <p>Sorry! But it needs to be new.</p>
            <h4>- Can I use MCreator/AI?</h4>
            <p>No. You must code the mod yourself.</p>
            <h4>- Can I use libraries? Can I use Kotlin?</h4>
            <p>Yup!</p>
            <h4>- Can I make a shader instead?</h4>
            <p>Of course! Shaders are awesome!</p>
            <h4>- Other questions?</h4>
            <p>
              Join{" "}
              <a
                target="_blank"
                href="https://app.slack.com/client/T0266FRGM/C07NQ5QAYNQ">
                our slack channel
              </a>{" "}
              (#mc-modding) on{" "}
              <a target="_blank" href="https://hackclub.com/slack/">
                Hack Club's Slack
              </a>
              , follow the instructions on the slack to join.
            </p>
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
