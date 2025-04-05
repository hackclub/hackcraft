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
      <img src="images/logo.png" alt="Minecraft Logo" width="100%" />
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
        <h3>Setting up the project</h3>
        <p>First, we will need a powerful IDE: <a target="_blank" href="https://www.jetbrains.com/idea/download/">IntellIJ Idea Community Edition</a>, be sure to scroll down and download Community Edition, it's free!</p>
	<p>After it's downloaded, open up the application, and click on the "Plugins" on the left bar.</p>
	<p>Search for "Minecraft Development", and click install.</p>
	<p>We also need to setup time tracking: Search "Wakatime" and click install. After that, click Restart IDE.</p>
	<p>Now go connect to <a target="_blank" href="https://hackatime.hackclub.com/">hackatime</a> and setup Hackatime following the instructions on the website.</p>
	<p>It's now time to create a new project! Click on the "New Project" button, and select "Minecraft" on the left side then choose JDK 21. (If JDK 21 isn't there, download it <a href="https://adoptium.net/temurin/releases/?package=jdk&version=21">here</a>!)</p>
        <p>Change the name and ids to whatever you like (scroll down and change group id too), then select "Fabric" in the "Templates". Your command creation dialogue should look like this:</p>
        <img src="images/project-creation.png" alt="Project Creation Pic" width="100%" />
	<p>Click create and you have setup the base of your fabric project!</p>
	<p>PS: If you see the error "Could not resolve net.fabricmc:fabric-loom:1.10-SNAPSHOT.", go to the file gradle &gt; wrapper &gt; gradle-wrapper.properties and change the distribution URL to "https\://services.gradle.org/distributions/gradle-8.14-milestone-4-bin.zip".</p>
	<p>To develop Minecraft plugins, we are going to use the <a href="https://fabricmc.net/">Fabric mod loader</a>. If there is something your confused about, go check their docs!</p>

	<p>Now, lets first launch the game! You don't need a Minecraft account to do this: You can find the launch profiles in the top-right corner of the window. Click the dropdown menu to see the available launch profiles.</p>
	<p>There should be a client and server profile, click on the green play button on the line with "Minecraft Client" written on it:</p>
        <img src="images/run-mc.png" alt="Run Minecraft" width="100%" />

	<p>Your game should launch! Now everytime you make changes in your code and want to try it out, relaunch Minecraft.</p>

	<h3>How to continue developing?</h3>
	<p>Consult the Fabric tutorial! It is awesomely written. <a href="https://docs.fabricmc.net/develop/items/first-item" target="_blank">You can add blocks, play sounds, add entities and more!</a></p>
	<p>Want to change some existing Minecraft behaviour? <a href="https://wiki.fabricmc.net/tutorial:mixin_introduction" target="_blank">Try using Mixins</a></p>
	<p>Need automatic data generation? <a href="https://docs.fabricmc.net/develop/data-generation/setup" target="_blank">Datagen has you covered!</a></p>
	<p>Want more features? <a href="https://docs.fabricmc.net/develop/sounds/using-sounds" target="_blank"></a>Read the fabric tutorial!</p>
      </div>
    </div>
  </div>
  <div className="container" style={{backgroundImage: 'url("images/deepslate.png")', backgroundRepeat: 'repeat'}}>
    <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
      <h2>Submitting</h2>

      <p><a target="_blank" href="https://hackclub.com/slack/">Join our slack</a>, then submit the following forum to submit!</p>
      <div style={{display: 'flex'}}>
        <a className="hoverable" id="form-link" href="https://airtable.com/appROpbCKgNm7r5ln/pagkMesml9lCVjZDP/form"
          target="_blank">Submit Now!</a>
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
