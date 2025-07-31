'use client';

import Link from 'next/link';
import LazyVideo from '~/components/LazyVideo';
import '~/styles/global.css';

const api_url = 'https://api2.hackclub.com/v0.1/MC%20Modding/Submissions?select={%22filterByFormula%22:%22{Status}=%27Approved%27%22}';
const data = await fetch(api_url);
const entries = await data.json();

export default function GalleryPage() {
	return (
		<>
			<div id='navbar'>
				<a className='banner' href='https://hackclub.com/'>
					<img src='https://contribute.hackclub.com/images/flag-orpheus-top.png' alt="Dinosaur arm holding flag that reads 'Hack Club'" />
				</a>
				<Link className='back' href='/'>
					back
				</Link>
			</div>
			<div className='container' style={{ backgroundImage: 'url(/images/dirt.png)', textAlign: 'center' }}>
				<h2>See what others made!</h2>
				<div className='showcase' style={{ textAlign: 'center', padding: '1em' }}>
					{entries.map((data, index) => {
						const info = data['fields'];

						return (
							<div key={index}>
								<p
									style={{ whiteSpace: 'pre-line', position: 'relative', cursor: 'pointer', textDecoration: 'underline dotted', textDecorationThickness: '3px' }}
									onMouseEnter={e => {
										const tooltip = document.createElement('div');
										tooltip.innerText = info['Description'];
										tooltip.style.position = 'absolute';
										tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
										tooltip.style.color = 'white';
										tooltip.style.padding = '10px';
										tooltip.style.borderRadius = '5px';
										tooltip.style.top = '100%';
										tooltip.style.left = '0';
										tooltip.style.right = '0';
										tooltip.style.marginLeft = 'auto';
										tooltip.style.marginRight = 'auto';
										tooltip.style.textAlign = 'center';
										tooltip.style.zIndex = '1000';
										tooltip.style.fontSize = '0.8em';
										tooltip.style.opacity = '0';
										tooltip.style.transition = 'opacity 0.3s ease-in-out';
										tooltip.id = `tooltip-${index}`;
										const target = e.target as HTMLElement;
										target.appendChild(tooltip);
										setTimeout(() => {
											tooltip.style.opacity = '1';
										}, 10);
									}}
									onMouseLeave={() => {
										const tooltip = document.getElementById(`tooltip-${index}`);
										if (tooltip) {
											tooltip.style.opacity = '0';
											setTimeout(() => {
												if (tooltip.parentNode) {
													tooltip.parentNode.removeChild(tooltip);
												}
											}, 300);
										}
									}}>
									{info[0]}
								</p>
								<LazyVideo src={info['Demo video']} />
								<br />
								<a href={info['Code link']} target='_blank' rel='noopener noreferrer'>
									GitHub
								</a>{' '}
								<a href={info['Play link']} target='_blank' rel='noopener noreferrer'>
									Modrinth
								</a>{' '}
								<hr />
							</div>
						);
					})}
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
