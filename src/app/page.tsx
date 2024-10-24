import SplashText from "~/components/SplashText";
import '~/styles/global.css';

export default function Home() {
  return (
    <>
    <div id="navbar">
    <a className="banner" href="https://hackclub.com/">
      <img src="https://contribute.hackclub.com/images/flag-orpheus-top.png"
        alt="Dinosaur arm holding flag that reads 'Hack Club'" />
    </a>
  </div>
  <div id="header">
    <div style={{position: 'relative', paddingBottom: '5em'}}>
      <img src="images/logo.png" alt="Minecraft Logo" width="100%" height="auto" />
      <SplashText />
    </div>
    <div id="subtitle" style={{fontSize: '1.2em'}}>
      <span>Ship a mod</span>
      <span>Get Minecraft</span>
    </div>
    <a href="https://airtable.com/appROpbCKgNm7r5ln/pagHuAw1cqV1a3VTm/form"
      target="_blank"><button className="hoverable">RSVP for stickers!</button></a>
  </div>
  <div id="content">
    <div className="container">
      <div className="grid-steps">
        <div className="item-step hoverable" style={{backgroundImage: 'url(images/code.png)'}}>
          <div className="mc-number">1</div>
          <p className="item-text">Make a mod</p>
        </div>
        <div className="item-step hoverable" style={{backgroundImage: 'url(images/modrinth.png)'}}>
          <div className="mc-number">2</div>
          <p className="item-text">Publish it on Modrinth</p>
        </div>
        <div className="item-step hoverable" style={{backgroundImage: 'url(images/shop.png)'}}>
          <div className="mc-number">3</div>
          <p className="item-text">Get Minecraft!</p>
        </div>
        <div className="item-step hoverable" style={{backgroundImage: 'url(images/play.png)'}}>
          <div className="mc-number">4</div>
          <p className="item-text">Enjoy!</p>
        </div>
      </div>
    </div>
  </div>
  <div className="container" style={{backgroundImage: 'url("images/deepslate.png")', backgroundRepeat: 'repeat'}}>
    <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
      <h2 className="player1">I see the game you mean.</h2>
      <p className="player2">Minecraft?</p>
      <p className="player1">Yes. Take care. It has reached a higher level now. It can read our desires.</p>
      <p className="player2">You can do whatever you want. There&apos;s unlimited freedom.</p>
      <p className="player1">It reads our thoughts like they were code on a screen.</p>
      <p className="player2">Go out and make something cool</p>
      <a href="https://github.com/MelnCat/IncompleteCombustion" target="_blank">
        just like this mod</a>.
      <h3>Craft a mod...</h3>
      <p>
        Never made a mod? <strong>It&apos;s the perfect time to <a href="https://workshops.hackclub.com/minecraft_modding/"
            target="_blank">build one</a></strong>. For
        inspiration, check out:
      </p>
      <ul>
        <li><a href="https://modrinth.com/mod/wakatime-mod" target="_blank">A wakatime tracker</a> • <a
            href="https://github.com/NeonGamerBot-QK/wakatime-mod" target="_blank">the code</a></li>
        <li><a href="https://www.spigotmc.org/resources/incomplete-combustion.119369/" target="_blank">a combustion
            plugin</a> • <a href="https://github.com/MelnCat/IncompleteCombustion" target="_blank">the code</a></li>
        <li><a href="https://modrinth.com/mod/2d-minecraft" target="_blank">2D Minecraft mod</a> • <a
            href="https://github.com/cheyao/minecraft-plugin" target="_blank">the code</a></li>
        <li><a href="https://modrinth.com/plugin/strings" target="_blank">strings chat plugin</a> • <a
            href="https://github.com/Wiicart/Strings" target="_blank">the code</a></li>
      </ul>
      <p>More of a social coder? You can also <a href="https://hackclub.com/slack?event=HackCraft">hang out online with
          other
          high schoolers</a> learning to build their first mods</p>
      <h3>Place the blocks...</h3>
      <p>
      <em>
        Publish your mod to the blocky world on <a href="https://modrinth.com" target="_blank">Modrinth</a> or <a
          href="https://hangar.papermc.io" target="_blank">Hangar</a> to get a Minecraft account.
      </em>
      </p>
      <div style={{display: 'flex'}}>
        <a className="hoverable" id="form-link" href="https://airtable.com/appROpbCKgNm7r5ln/pagHuAw1cqV1a3VTm/form"
          target="_blank">RSVP!</a>
      </div>
      </div>
    </div>
  <div id="footer">
    <em className="player1 love">And the universe said I love you...</em>
    <p style={{display: 'flex', gap: '4px', justifyContent: 'center'}}>Made with <img src="images/dancing_parrot.gif"
        alt="minecraft parrot" title="A minecraft parrot" height="20px" /> by <a href="https://hackclub.com">Hack
        Club</a>.</p>
  </div>
  </>
  );
}
