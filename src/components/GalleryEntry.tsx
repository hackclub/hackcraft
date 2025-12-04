'use client';

import LazyVideo from '~/components/LazyVideo';

interface GalleryEntryProps {
	info: Record<string, string>;
	index: number;
}

export default function GalleryEntry({ info, index }: GalleryEntryProps) {
	return (
		<div>
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
				{info['Name']}
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
}
