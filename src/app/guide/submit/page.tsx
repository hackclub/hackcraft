import Link from 'next/link';
import SplashText from '~/components/SplashText';
import '~/styles/global.css';

export const revalidate = 60;

export default function Submit() {
	return (
		<>
			<div id='navbar'>
				<a className='banner' href='https://hackclub.com/'>
					<img src='https://contribute.hackclub.com/images/flag-orpheus-top.png' alt="Dinosaur arm holding flag that reads 'Hack Club'" />
				</a>
				<Link className='back' href='/guide#2'>
					back
				</Link>
			</div>
			<div id='header'>
				<div style={{ position: 'relative', bottom: '1.5em' }}>
					<Link href='/'>
						<img src='/images/logo.png' alt='Minecraft Logo' width='100%' />
					</Link>
					<SplashText />
				</div>
				<div id='subtitle' style={{ fontSize: '1.2em', position: 'relative' }}>
					<span>Submitting</span>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/dirt.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<h2>Before you submit</h2>
					<ul>
						<li>Make sure your mod is good :3</li>
						<li>Confirm that you did not make it with AI.</li>
						<li>Test if your mod works properly on a server and outside of a development environment.</li>
						<li>Make sure your mod has the necessary 3 features or 5 if you are not on 1.21.8 fabric.</li>
						<li>Check if your mod is survival-friendly.</li>
						<li>Ensure you are in #mc-modding so you can receive your prize.</li>
					</ul>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/cobblestone.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<div id='1' className='section-title'>
						<h3>Publishing to GitHub</h3>
						<a href='#2' className='skip'>
							skip
						</a>
					</div>
					<i style={{ fontSize: '1rem' }}>You are allowed to use another git provider, but we recommend GitHub.</i>
					<p>Go to Menu &gt; Git &gt; GitHub &gt; Share Project On GitHub, disable Private and Share, this should create a Git repo for you.</p>
					<img src='/images/share-on-github.png' alt='Share on GitHub' width='100%' />
					<p>If you ever need to update your mod click the "Commit" button on the left, select all changes, write a message and press "Commit and Push".</p>
				</div>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<div id='2' className='section-title'>
						<h3>Publishing to Modrinth</h3>
						<a href='#3' className='skip'>
							skip
						</a>
					</div>
					<p>
						First we need to package our mod, in Intellij click on the gradle icon (the elephant) on the left of your screen and double click build to create a jar containing all your
						work.
					</p>
					<img src='/images/build.png' alt='Building the mod' width='100%' />
					<p>
						Go to <a href='https://modrinth.com/'>Modrinth</a> and click the + in the top left (sign in if you haven't already) and create a new project. Modrinth already guides you
						through the process, but watch out for these common pitfalls to prevent getting your mod rejected:
					</p>
					<ul>
						<li>
							Make sure you have a lengthy and properly formatted description encapsulating all features (<a href='https://modrinth.com/mod/quark'>good example</a>,{' '}
							<a href='https://modrinth.com/mod/entityculling'>great example</a>)
						</li>
						<li>Make sure you have a functional GitHub repository/issues link.</li>
						<li>Check that your license matches the one on GitHub</li>
						<li>Make sure you selected the correct version range, in most cases it will be 1.21.6-1.21.8</li>
						<li>Ensure you are using the correct environment, if you don't know what this means select "both"</li>
					</ul>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/deepslate.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<h2 id='3'>Ready to submit?</h2>
					<div style={{ display: 'flex' }}>
						<a className='hoverable' id='form-link' href='https://airtable.com/appROpbCKgNm7r5ln/pagkMesml9lCVjZDP/form' target='_blank'>
							Submit Now!
						</a>
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
