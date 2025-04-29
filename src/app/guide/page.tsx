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
        <h2>No Experience?</h2>
        <p>Don't know how to starting modding Minecraft? We've got you covered!</p>
      </div>
    </div>
  </div>
  <div id="content">
    <div className="container" style={{backgroundImage: 'url("images/cobblestone.png")', backgroundRepeat: 'repeat'}}>
      <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
        <h3>Setting up your project</h3>
        <p>First, we will require a powerful IDE. For this guide, we will use <a target="_blank" href="https://www.jetbrains.com/idea/download/">IntellIJ Idea Community Edition</a>.</p>
        <p>Make sure to download the Community Edition. This will make sure that you're modding without any costs!</p>
	<p>After it has been downloaded onto your computer, open up the application, and click on the "Plugins" on the bar on the left side of your screen.</p>
	<p>Search for "Minecraft Development", and click install on the plugin.</p>
	<p>We also need to setup time tracking for your project. Search "Wakatime" and click install. After that, click Restart IDE.</p>
	<p>After that, connect to your <a target="_blank" href="https://hackatime.hackclub.com/">hackatime</a> and setup Hackatime following the instructions on the website.</p>
	<p>Finally, it's time to create a new project! Click on the "New Project" button, and select "Minecraft" on the left side. Choose "JDK 21". (If you can't see the option, download the JDK <a href="https://adoptium.net/temurin/releases/?package=jdk&version=21">here</a>!)</p>
        <p>You can change the name and ids to whatever you like (remember to scroll down and change the group id too!), then select "Fabric" in "Templates". Your command creation dialogue should look like this:</p>
        <img src="images/project-creation.png" alt="Project Creation Pic" width="100%" />
	<p>Then, create the project. Look at what you've done: you've just setup the base of your fabric project!</p>
	<p style={{fontSize: '1rem'}}><i>Note: If you see the error "Could not resolve net.fabricmc:fabric-loom:1.10-SNAPSHOT.", go to the file gradle &gt; wrapper &gt; gradle-wrapper.properties and change the distribution URL to "https\://services.gradle.org/distributions/gradle-8.14-milestone-4-bin.zip".</i></p>
	<p>To developing Minecraft mods, we are going to use the <a href="https://fabricmc.net/">Fabric mod loader</a>. If there's something you're confused about, go check their <a target="_blank" href="https://fabricmc.net/develop/">docs</a>!</p>

	<p>Now, lets launch the game for the first time! You can find the launch profiles in the top-right corner of the window. Click the dropdown menu to see the available launch profiles.</p>
	<p>There should be a client and server profile, click on the green play button next to the label that reads "Minecraft Client".</p>
        <img src="images/run-mc.png" alt="Run Minecraft" width="100%" />

	<p>Your game should now launch! Remember that everytime you make changes in your code and want to test it, you must relaunch Minecraft.</p>

	<h3>What do I do next?</h3>
	<p>Follow the Fabric tutorial for modding! It's excellent: if you want to add your first item, we highly suggest you follow the guide <a href="https://docs.fabricmc.net/develop/items/first-item" target="_blank">here</a>!</p>
	<p>Want to change some existing Minecraft behaviour? <a href="https://wiki.fabricmc.net/tutorial:mixin_introduction" target="_blank">Try using Mixins</a></p>
	<p>Need automatic data generation? <a href="https://docs.fabricmc.net/develop/data-generation/setup" target="_blank">Datagen has you covered!</a></p>
	<p>Want to add more features? <a href="https://docs.fabricmc.net/develop/sounds/using-sounds" target="_blank">Read everything here!</a></p>
        <p>Go for the <a href="https://docs.fabricmc.net/develop/">Fabric guide</a> for anything else!</p>
      </div>
    </div>
  </div>
  <div className="container" style={{backgroundImage: 'url("images/deepslate.png")', backgroundRepeat: 'repeat'}}>
    <div className="section" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem'}}>
      <h2>How do I submit my finished project?</h2>
      <p>Join <a target="_blank" href="https://app.slack.com/client/T0266FRGM/C07NQ5QAYNQ">our slack channel</a> (#mc-modding) on <a target="_blank" href="https://hackclub.com/slack/">Hack Club's Slack</a>, then follow the instructions to join.</p>
      <p>Only after joining Hack Club's Slack you may submit.</p>
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
