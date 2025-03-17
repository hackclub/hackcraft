import SplashText from "~/components/SplashText";
import '~/styles/global.css';

export const revalidate = 60;

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
    <div style={{position: 'relative', bottom: '1.5em'}}>
      <img src="images/logo.png" alt="Minecraft Logo" width="100%"  />
      <SplashText />
    </div>
    <div id="subtitle" style={{fontSize: '1.2em', position: 'relative'}}>
      <span>The Guide™</span>
    </div>
  </div>
  <div id="content">
    <div className="container" style={{backgroundImage: 'url("images/dirt.png")', backgroundRepeat: 'repeat'}}>
      <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
        <h2>MC Tutorial!</h2>
        <p>No idea how to make a mod? We got you covered!</p>
      </div>
    </div>
  </div>
  <div id="content">
    <div className="container" style={{backgroundImage: 'url("images/cobblestone.png")', backgroundRepeat: 'repeat'}}>
      <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
        <h2>But how to make a mod?</h2>
        <p>IDK!</p>
      </div>
    </div>
  </div>
  <div className="container" style={{backgroundImage: 'url("images/deepslate.png")', backgroundRepeat: 'repeat'}}>
    <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
      <h2>FAQ</h2>
      <h3>How can I make a mod without owning Minecraft?</h3>
      <p>You can launch Minecraft directly with fabric without an account!</p>
      <h3>idk?</h3>
      <p>How :33333</p>
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
