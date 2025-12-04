import Link from 'next/link';
import GalleryEntry from '~/components/GalleryEntry';
import '~/styles/global.css';

const api_url = 'https://api2.hackclub.com/v0.1/MC%20Modding/Submissions?select={%22filterByFormula%22:%22{Status}=%27Approved%27%22}';

export default async function GalleryPage() {
	const data = await fetch(api_url, { next: { revalidate: 60 } });
	const entries = await data.json();

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
					{Array.isArray(entries) ? (
						entries.map((data, index) => (
							<GalleryEntry key={index} info={data['fields']} index={index} />
						))
					) : (
						<p>No entries available at this time.</p>
					)}
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
