import Gallery from "~/components/Gallery";
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
  <div id="content">
    <div className="container" style={{backgroundImage: 'url(images/dirt.png)', textAlign: "center"}}>
      <h2>See what others made!</h2>
      <div className="showcase" style={{textAlign: "center", padding: '1em'}}>
        <Gallery />
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
