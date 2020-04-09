import React, {SyntheticEvent} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

interface ThumbnailProps {
	picture: string
	name: string
	temperament: string
	description: string
	className: string
}

const CatThumbnail = (props: ThumbnailProps) => {
	const {picture, name, description, temperament, className} = props
	/**
	 * We check what orientation Image is to apply different
	 * styling optinon to insure that the image covers the thumbnail fully
	 *
	 * For now, we will assume that the image is square
	 */
	const [size, setSize] = React.useState([1, 1])
	const [isMouseOver, setMouseOver] = React.useState(false)

	const [allowAnimations, setAllowAnimations] = React.useState(false)

	// if image is horizontal, we scale it up to fill the container
	const imageScale = (isMouseOver ? 0.08 : 0) + Math.max(size[0] / size[1] / 0.8, 1)
	const imageUrl = `/public-assets/${picture}`
	const isLoading = size[0] === 1

	const onLoadedImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const image = (e.target as unknown) as HTMLImageElement
		const {width, height} = image
		if (width === size[0] && width === size[1]) {
			// image dimensions haven't changes
			// no need to perform the update
			return
		}
		setSize([width, height])
	}

	React.useEffect(() => {
		// we will allow hovering animations when Image has finished loading
		// and we know its dimensions, this is done to avoid flickering while resizing
		if (!allowAnimations && !allowAnimations) {
			setTimeout(() => setAllowAnimations(true), 500)
		}
	}, [isLoading])

	return (
		<article className={classnames(className, {hover: isMouseOver, loading: isLoading, 'animations-allowed': allowAnimations})} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
			<div className="head">
				<div className="avatar">
					<span>{name[0]}</span>
				</div>
				<div className="title-block">
					<span className="main">{name}</span>
					<div>{temperament}</div>
				</div>
			</div>
			<div className="picture">
				<img style={{transform: `scale(${imageScale})`}} src={imageUrl} alt={`Breed: ${name}`} onLoad={onLoadedImage} />
			</div>
			<div className="body">
				<div className="description">{description}</div>
			</div>
		</article>
	)
}

export default styled(CatThumbnail)`
	position: relative;
	display: flex;
	flex-direction: column;
	box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
	background: white;
	border-radius: 4px;

	.avatar {
		width: 40px;
		height: 40px;
		display: flex;
		overflow: hidden;
		position: relative;
		font-size: 1.25rem;
		align-items: center;
		flex-shrink: 0;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		line-height: 1;
		user-select: none;
		border-radius: 50%;
		justify-content: center;
		margin-right: 13px;
		background: red;
		color: white;
	}

	.head {
		display: flex;
		align-items: center;
	}

	.main {
		font-size: 0.875rem;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		font-weight: 400;
		line-height: 1.43;
		letter-spacing: 0.01071em;
		width: 50%;
		white-space: wrap;
		color: black;
	}

	.body {
		font-size: 0.875rem;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		font-weight: 400;
		line-height: 1.43;
		letter-spacing: 0.01071em;
		color: rgba(0, 0, 0, 0.54);
	}

	.description {
		height: 60px;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.picture {
		width: 100%;
		position: relative;
		overflow: hidden;
		padding-top: 80%;
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
		margin: 0;
	}

	.head,
	.body {
		padding: 16px;
	}
`
