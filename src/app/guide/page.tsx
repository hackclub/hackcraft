import Link from 'next/link';
import SplashText from '~/components/SplashText';
import '~/styles/global.css';

export const revalidate = 60;

export default function GuidePage() {
	return (
		<>
			<div id='navbar'>
				<a className='banner' href='https://hackclub.com/'>
					<img src='https://contribute.hackclub.com/images/flag-orpheus-top.png' alt="Dinosaur arm holding flag that reads 'Hack Club'" />
				</a>
			</div>
			<div id='header'>
				<div style={{ position: 'relative', bottom: '1.5em' }}>
					<Link href='/'>
						<img src='/images/logo.png' alt='Minecraft Logo' width='100%' />
					</Link>
					<SplashText />
				</div>
				<div id='subtitle' style={{ fontSize: '1.2em', position: 'relative' }}>
					<span>The Guide™</span>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/dirt.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<h2>No Experience?</h2>
					<p>Don't know how to start modding Minecraft? We've got you covered!</p>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/cobblestone.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<i style={{ fontSize: '1rem' }}>
						This tutorial assumes you have basic knowledge of Java, if you don't know Java, we recommend you learn it first. You can find a good tutorial{' '}
						<a href='https://www.learnjavaonline.org/' target='_blank'>
							Online
						</a>
						{', '}
						<a href='https://academy.jetbrains.com/?tag=Java' target='_blank'>
							In IDE
						</a>
						{', '}
						<a href='https://learnxinyminutes.com/java' target='_blank'>
							Or here if you are looking for a quick overview by example.
						</a>
					</i>
					<div className='section-title' id='1'>
						<h3>Setting up your project</h3>
						<a href='#2' className='skip'>
							skip
						</a>
					</div>
					<i style={{ fontSize: '1rem' }}>
						Hackcraft uses 1.21.8, this is a relatively new version so some tutorials may be out of date. If something is not right, try looking it up on the internet or if you can't
						find anything, ask in #mc-modding.
					</i>
					<p>
						First, we will require a powerful IDE. For this guide, we will use{' '}
						<a target='_blank' href='https://www.jetbrains.com/idea/download/'>
							IntelliJ IDEA
						</a>
						.
					</p>
					<p>
						Make sure to download the Community Edition, or apply for <a href='https://www.jetbrains.com/academy/student-pack/'>the student pack</a>.
					</p>
					<i style={{ fontSize: '1rem' }}>You can use another IDE but IntelliJ is by far the best, especially for mixins.</i>
					<p>After it has been downloaded onto your computer, open up the application, and click on the "Plugins" on the bar on the left side of your screen.</p>
					<p>Search for "Minecraft Development", and click install on the plugin.</p>
					<p>We also need to setup time tracking for your project. Search "Wakatime" and click install. After that, click Restart IDE.</p>
					<p>
						After that, connect to your{' '}
						<a target='_blank' href='https://hackatime.hackclub.com/'>
							hackatime
						</a>{' '}
						and setup Hackatime following the instructions on the website if you haven't already.
					</p>
					<p>
						To developing Minecraft mods, we are going to use the <a href='https://fabricmc.net/'>Fabric mod loader</a> and its API. If there's something you're confused about, go check
						their{' '}
						<a target='_blank' href='https://fabricmc.net/develop/'>
							docs
						</a>
						!
					</p>

					<i style={{ fontSize: '1rem' }}>
						Fabric is a lightweight modular and modern modding toolchain that does almost nothing on its own, instead it relies more on vanillas infrastructure and a separate API mod to
						fill in the gaps. If you are coming from Forge, you will notice that Fabric is a lot simpler and flexible making the switch very easy.
					</i>
					<p>
						Finally, it's time to create a new project! Click on the "New Project" button, and select "Minecraft" on the left side. Choose "JDK 21". (If you can't see the option, download
						the JDK <a href='https://adoptium.net/temurin/releases/?package=jdk&version=21'>here</a>!)
					</p>
					<p>
						You can change the name and ids to whatever you like except for something generic like "hackcraft" (remember to scroll down and change the group id too!), then select "Fabric"
						in "Templates" and enable Git. Your command creation dialogue should look like this:
					</p>
					<img src='/images/project-creation.png' alt='Project Creation Pic' width='100%' />
					<p>If you don't know what datagen or split sources are, disable them. If you don't care about licensing MIT is a good option.</p>
					<p>Then, create the project. Look at what you've done: you've just setup the base of your fabric project!</p>
					<p style={{ fontSize: '1rem' }}>
						<i>
							Note: If you see the error "Could not resolve net.fabricmc:fabric-loom:1.10-SNAPSHOT.", go to the file gradle &gt; wrapper &gt; gradle-wrapper.properties and change the
							distribution URL to "https\://services.gradle.org/distributions/gradle-8.14.3-bin.zip".
						</i>
					</p>

					<p>
						Now, lets launch the game for the first time! You can find the launch profiles in the top-right corner of the window. Click the dropdown menu to see the available launch
						profiles.
					</p>
					<p>There should be a client and server profile, click on the green play button next to the label that reads "Minecraft Client".</p>
					<img src='/images/run-mc.png' alt='Run Minecraft' width='100%' />

					<p>Your game should now launch! Remember that everytime you make changes in your code and want to test it, you must relaunch Minecraft.</p>
				</div>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem', marginTop: '1rem' }}>
					<h3 id='2'>What do I do next?</h3>
					<p>
						Quick heads up. There will be a server at the end showcasing all 1.21.8 fabric mods that are not too intrusive on gameplay (or opt-in). We urge you to take your time to plan
						out something that is <i>fun</i> above everything, think playful mobs, movement, fun PvP abilities, minigames, as long as it is <i>fun</i>. Keep in mind most people will only
						see your mod for a short amount of time, lets make this awesome!
					</p>
					<p>
						Follow the Fabric tutorial for modding! It's excellent: if you want to add your first item, we highly suggest you follow the guide{' '}
						<a href='https://docs.fabricmc.net/develop/items/first-item' target='_blank'>
							here
						</a>
						!
					</p>
					<p>
						Want to change some existing Minecraft behaviour?{' '}
						<Link className='hoverable' href='/guide/mixin'>
							Try using Mixin!
						</Link>
					</p>
					<p>
						Want to create your own textures and models?{' '}
						<a href='https://blockbench.net/' target='_blank'>
							Use BlockBench
						</a>{' '}
						(<a href='https://www.blockbench.net/wiki/guides/minecraft-style-guide'>good style guide</a>,{' '}
						<a href='https://hackclub.slack.com/archives/C08S7247DSM' target='_blank'>
							wakatime plugin
						</a>
						)
					</p>
					<p>
						Go for the <a href='https://docs.fabricmc.net/develop/'>Fabric documentation</a> or <a href='https://wiki.fabricmc.net/tutorial:start'>Fabric wiki</a> (less good and up to
						date, more complete) for anything else!
					</p>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/deepslate.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<h2>How do I submit my finished project?</h2>
					<p>
						Join{' '}
						<a target='_blank' href='https://app.slack.com/client/T0266FRGM/C07NQ5QAYNQ'>
							our slack channel
						</a>{' '}
						(#mc-modding) on{' '}
						<a target='_blank' href='https://hackclub.com/slack/'>
							Hack Club's Slack
						</a>
						, then follow the instructions to join.
					</p>
					<p>Only after joining Hack Club's Slack you may submit.</p>
					<div style={{ display: 'flex' }}>
						<Link className='hoverable' id='form-link' href='/guide/submit'>
							Submitting
						</Link>
					</div>
				</div>
			</div>
			<div id='footer'>
				<em className='player1 love'>And the universe said I love you...</em>
				<p style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
					Made with <img src='/images/dancing_parrot.gif' alt='minecraft parrot' title='A minecraft parrot' height='20px' /> by <a href='https://hackclub.com'>Hack Club</a>.
				</p>
			</div>
		</>
	);
}
