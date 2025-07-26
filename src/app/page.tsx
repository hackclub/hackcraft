'use client';
import SplashText from '~/components/SplashText';
import Link from 'next/link';
import '~/styles/global.css';

const featuredMods = [
	'https://github.com/MelnCat/IncompleteCombustion',
	'https://modrinth.com/mod/cameratweaks',
	'https://modrinth.com/mod/2d-minecraft',
	'https://modrinth.com/mod/omnilook',
	'https://modrinth.com/mod/extra-ores-items',
	'https://modrinth.com/mod/magic-craft',
	'https://modrinth.com/mod/farmers-delight-kacchi',
	'https://modrinth.com/mod/portal-gun-mod',
	'https://modrinth.com/mod/skibidi-brainrot-mod',
	'https://modrinth.com/mod/villager-tower-mod',
	'https://modrinth.com/mod/night-vision-revamp',
	'https://modrinth.com/mod/skillsmod',
	'https://modrinth.com/mod/nuggetmod',
	'https://modrinth.com/mod/abyssium',
	'https://modrinth.com/mod/namemanager',
	'https://modrinth.com/mod/simplespotifycontroller',
	'https://modrinth.com/mod/mc-death-note-mod',
	'https://modrinth.com/mod/snowball-hole-filler',
	'https://modrinth.com/mod/not-apples',
	'https://modrinth.com/mod/big-ships',
	'https://modrinth.com/mod/player-pearls',
	'https://modrinth.com/mod/schrodingers-chest',
	'https://modrinth.com/mod/chrono-domain',
	'https://modrinth.com/mod/nibbles-deep-dark',
	'https://modrinth.com/mod/js-turret',
	'https://modrinth.com/mod/tecnogui',
	'https://modrinth.com/mod/aviros',
	'https://modrinth.com/mod/eatermod',
	'https://modrinth.com/mod/planecraft',
	'https://modrinth.com/mod/magic-wands',
	'https://modrinth.com/mod/onomatopoeia',
	'https://modrinth.com/mod/lets-go-gambling!',
	'https://modrinth.com/mod/simpleedits',
	'https://modrinth.com/mod/wakatime-mod',
	'https://modrinth.com/mod/mc-game-of-life-sim',
	'https://modrinth.com/mod/ferret-friends',
	'https://modrinth.com/plugin/voteupdate',
	'https://modrinth.com/mod/quick-f3',
	'https://modrinth.com/mod/echoes-of-time',
	'https://modrinth.com/mod/potato-perks',
	'https://modrinth.com/mod/server-playtime-manager',
	'https://modrinth.com/mod/explorie',
	'https://modrinth.com/mod/rainbow-wood',
	'https://modrinth.com/mod/chatdebug',
	'https://modrinth.com/plugin/world-border-expansion',
	'https://modrinth.com/mod/tecnomap',
	'https://modrinth.com/plugin/command-reporter',
	'https://modrinth.com/mod/railcraft',
	'https://modrinth.com/mod/gateway',
	'https://modrinth.com/plugin/mcgambling',
	'https://modrinth.com/mod/minecraft-rivals',
	'https://modrinth.com/mod/arsenal-and-anvil',
	'https://modrinth.com/mod/enderchestheadsup',
	'https://modrinth.com/mod/project-gorilla',
	'https://modrinth.com/mod/divinetowers',
	'https://modrinth.com/mod/studycraft',
	'https://modrinth.com/mod/chronoelegy',
	'https://modrinth.com/mod/mwhrd'
];

export default function HomePage() {
	return (
		<>
			<div id='navbar'>
				<a className='banner' href='https://hackclub.com/'>
					<img src='https://contribute.hackclub.com/images/flag-orpheus-top.png' alt="Dinosaur arm holding flag that reads 'Hack Club'" />
				</a>
			</div>
			<div id='header'>
				<div style={{ position: 'relative', bottom: '5em' }}>
					<img src='/images/logo.png' alt='Minecraft Logo' width='100%' />
					<SplashText />
				</div>
				<div id='subtitle' style={{ fontSize: '1.2em', bottom: '3.5em', position: 'relative' }}>
					<span>Ship a mod</span>
					<span>Get Minecraft</span>
				</div>
				<div style={{ width: 'auto', position: 'relative' }}>
					<Link style={{ bottom: '3em', position: 'relative', display: 'inline-block', marginRight: '3px' }} href='/guide'>
						<button className='hoverable'>Tutorial</button>
					</Link>
					<Link style={{ bottom: '3em', position: 'relative', display: 'inline-block', marginRight: '3px', marginLeft: '3px' }} href='/gallery'>
						<button className='hoverable'>Gallery</button>
					</Link>
					<Link style={{ bottom: '3em', position: 'relative', display: 'inline-block', marginRight: '3px', marginLeft: '3px' }} href='/guide/submit'>
						<button className='hoverable'>Submit</button>
					</Link>
				</div>
			</div>
			<div className='container'>
				<div className='grid-steps'>
					<div className='item-step hoverable' style={{ backgroundImage: 'url(/images/code.png)' }}>
						<div className='mc-number'>1</div>
						<p className='item-text'>Make a mod</p>
					</div>
					<div className='item-step hoverable' style={{ backgroundImage: 'url(/images/time.png)' }}>
						<div className='mc-number'>2</div>
						<p className='item-text'>Track time</p>
					</div>
					<div className='item-step hoverable' style={{ backgroundImage: 'url(/images/modrinth.png)' }}>
						<div className='mc-number'>3</div>
						<p className='item-text'>Publish it on Modrinth</p>
					</div>
					<div className='item-step hoverable' style={{ backgroundImage: 'url(/images/shop.png)' }}>
						<div className='mc-number'>4</div>
						<p className='item-text'>Get Minecraft!</p>
					</div>
				</div>
			</div>
			<div className='container' style={{ backgroundImage: 'url("/images/deepslate.png")', backgroundRepeat: 'repeat' }}>
				<div className='section' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 1rem 1rem 1rem' }}>
					<h2 className='player1'>I see the game you mean.</h2>
					<p className='player2'>Minecraft?</p>
					<p className='player1'>Yes. Take care. The player is ready to reach a higher level in it, they may soon see the code.</p>
					<p className='player2'>They read our thoughts like they were code on a screen. All they need to do is reach out and make changes.</p>
					<p className='player1'>Change the code, and change the universe. You can do whatever you want. There&apos;s unlimited freedom.</p>
					<p className='player2'>Go out and make something cool.</p>
					<p className='player1'>Join others as they create their own universes.</p>
					<a
						href={featuredMods[Math.floor(Math.random() * featuredMods.length)]}
						onClick={e => {
							const anchor = e.target as HTMLAnchorElement;
							anchor.href = featuredMods[Math.floor(Math.random() * featuredMods.length)];
						}}
						target='_blank'
						suppressHydrationWarning>
						just like these mods
					</a>
					.<h3>Check out the mods teens made last time!</h3>
					<video controls src='/video.mp4' width='100%' />
					<h3>Craft a mod...</h3>
					<p>
						Never made a mod? It's the perfect time to build one. For inspiration, check out{' '}
						<Link href='/gallery' target='_blank'>
							the gallery
						</Link>{' '}
						or{' '}
						<a href='https://discord.com/channels/507304429255393322/1079906503076626573' target='_blank'>
							Fabric's Discord
						</a>
						!
					</p>
					<p>
						More of a social coder? You can also <a href='https://hackclub.com/slack?event=HackCraft'>hang out online with other high schoolers</a> learning to build their first mods.
					</p>
					<h3>Place the blocks...</h3>
					<p>
						Create at least 3 features for your mod, or 5 if you are not on 1.21.8 fabric. A feature is a functional thing written in code that does something interesting in the game (at
						least 5 lines of code, JSON does not count). This can be a mixin, an item/block interaction, entity AI, rendering code, you name it! You can only count every feature once, so
						creating multiple items with similar features will only count as one feature.
					</p>
					<h3>Get the game...</h3>
					<p>
						Publish your mod to the blocky world on{' '}
						<a href='https://modrinth.com' target='_blank'>
							Modrinth
						</a>{' '}
						and share your source code to a platform like <a href='https://github.com/'>GitHub</a> to get stickers and a Minecraft account or server. On top of that if you get 600
						downloads in the first month, you get <a href='https://www.terraria.org/'>Terraria</a> for free! (Only 400 needed if you add the <a href='TODO'>Hackcraft banner</a> to your
						mod)
					</p>
					<h3>Play together...</h3>
					<p>At the end of the event, we will host a fabric server on 1.21.8 to showcase your mod and play with friends!</p>
					<h2>FAQ</h2>
					<h4>- How much time do I need to spend on my mod?</h4>
					<p>
						Doesn't matter, as long as you have at least 3 or 5 features!
						<br />
						<b>You still need Hackatime tho!</b>
					</p>
					<h4>
						- Can I double dip with <a href='https://summer.hackclub.com/'>Summer of Making?</a>
					</h4>
					<p>Yes, you can!</p>
					<h4>- Do I need Minecraft for this YSWS?</h4>
					<p>No, you don't need an account to create a mod and you can get one after!</p>
					<h4>- Can I submit an old mod?</h4>
					<p>Sorry! But it needs to be new.</p>
					<h4>- Can I use MCreator/AI?</h4>
					<p>No. You must code the mod yourself.</p>
					<h4>- Can I use libraries? Can I use Kotlin?</h4>
					<p>Yup!</p>
					<h4>- Other questions?</h4>
					<p>
						Join{' '}
						<a target='_blank' href='https://app.slack.com/client/T0266FRGM/C07NQ5QAYNQ'>
							our slack channel
						</a>{' '}
						(#mc-modding) on{' '}
						<a target='_blank' href='https://hackclub.com/slack/'>
							Hack Club's Slack
						</a>
						, follow the instructions on the slack to join.
					</p>
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
