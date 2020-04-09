import React,{ SyntheticEvent } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

interface ThumbnailProps {
	picture: string;
	name: string;
	className: string;
}

const CatThumbnail = (props: ThumbnailProps) => {
	const {
		picture,
		name,
		className
	} = props;
	/**
	 * We check what orientation Image is to apply different
	 * styling optinon to insure that the image covers the thumbnail fully
	 * 
	 * For now, we will assume that the image is square
	 */
	const [size,setSize] = React.useState([1,1]);
	const [isMouseOver,setMouseOver] = React.useState(false);

	const [allowAnimations,setAllowAnimations] = React.useState(false);

	// if image is horizontal, we scale it up to fill the container
	const imageScale = (isMouseOver ? 0.08 : 0) + Math.max((size[0] / size[1]) / 0.8,1);
	const imageUrl = `/public-assets/${picture}`;
	const isLoading = size[0] === 1;

	const onLoadedImage = (e: SyntheticEvent<HTMLImageElement,Event>) => {
		const image = e.target as unknown as HTMLImageElement;
		const { width,height } = image;
		if(width === size[0] && width === size[1]) {
			// image dimensions haven't changes
			// no need to perform the update
			return;
		}
		setSize([width,height]);
	};

	React.useEffect(() => {
		// we will allow hovering animations when Image has finished loading 
		// and we know its dimensions, this is done to avoid flickering while resizing
		if(!allowAnimations && !allowAnimations) {
			setTimeout(() => setAllowAnimations(true),500);
		}
	},[isLoading]);

	return (
		<article className={classnames(className,{ hover: isMouseOver,loading: isLoading,"animations-allowed": allowAnimations })}>
			<div className="head">
				<img
					onMouseEnter={() => setMouseOver(true)}
					onMouseLeave={() => setMouseOver(false)}
					style={{ transform: `scale(${imageScale})` }}
					src={imageUrl}
					alt={`Breed: ${name}`}
					onLoad={onLoadedImage}
				/>
			</div>
			<div className="body">
				<h4>{name}</h4>
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
		padding-top: 80%;
		border-radius: 10px;
		cursor: pointer;
	}

	img {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		transform-origin: top center;
		transition: opacity 0.5s ease-in;
	}

	&.animations-allowed {
		img {
			transition: all 0.5s ease-out;
		}
	}

	&.loading img,
	&.loading .body {
		opacity: 0;
	}

	h4 {
		margin: 10px 0 0 0;
	}
`;