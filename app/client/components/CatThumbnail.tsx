import React from 'react';
import styled from 'styled-components';

const CatThumbnail = ({
	picture,
	name,
	className
}) => {
	/**
	 * We check what orientation Image is to apply different
	 * styling optinon to insure that the image covers the thumbnail fully
	 * 
	 * For now, we will assume that the image is square
	 */
	const [size,setSize] = React.useState([1,1]);
	const imageUrl = `/public-assets/${picture}`;

	React.useEffect(() => {
		console.log();
	},[0]);

	return (
		<article className={className}>
			<div className="head">
				<img
					style={{
						// if image is horizontal, we scale it up to fill the container
						transform: size[0] > size[1] ? `scale(${size[0] / size[1]})` : ''
					}}
					src={imageUrl}
					alt={`Breed: ${name}`}
					onLoad={(e) => {
						const image = e.target as unknown as ImageData;
						const { width,height } = image;
						if(width === size[0] && width === size[1]) {
							// image dimensions haven't changes
							// no need to perform the update
							return;
						}
						setSize([width,height]);
					}}
				/>
			</div>
			<div className="body">
				<h4>
					{name}
				</h4>
			</div>
		</article>
	);
};

export default styled(CatThumbnail)`
	position: relative;

	display: flex;
	flex-direction: column;

	.head {
		width: 100%;
		position: relative;
		overflow: hidden;
		padding-top: 70%;
		border-radius: 10px;
		cursor: pointer;
	}

	img {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	h4 {
		margin: 10px 0 0 0;
	}
`;