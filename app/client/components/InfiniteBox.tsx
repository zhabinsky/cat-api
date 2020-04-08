import React from 'react';
import styled from 'styled-components';
import gq from '../api/gq';
import debounce from "lodash.debounce";

interface CreateQueryFunction {
	(skip: number,limit: number): string;
}

interface Props {
	title: string;
	pageSize: number;
	className: string;
	itemComponent: Function;
	createQuery: CreateQueryFunction;
}

// Helped https://alligator.io/react/react-infinite-scroll/

interface InfiniteBoxResponse {
	items: Array<object>;
}

const InfiniteBox = (props: Props) => {
	const { title,className,createQuery,pageSize,itemComponent: ItemComponent } = props;
	const [items,setItems] = React.useState([]);
	const [isLoading,setIsLoading] = React.useState(false);

	const loadMore = () => {
		setIsLoading(true);
		gq(createQuery(items.length,pageSize))
			.then((response: InfiniteBoxResponse) => {
				const { items: newItems } = response;
				const a = [...items,...newItems];
				console.log(a);
				setItems(a);
				setIsLoading(false);
			});
	};

	React.useEffect(() => { loadMore(); },[1]);
	React.useEffect(() => {
		if(isLoading) {
			window.onscroll = undefined; // we are not going to listen to scroll while items are loading
		} else {
			window.onscroll = debounce(() => {
				if(
					window.innerHeight + document.documentElement.scrollTop
					=== document.documentElement.offsetHeight
				) {
					loadMore();
				}
			},100);
		}
	},[items.length,isLoading]); // onScroll will change when: items.length is different or isLoading has changed 

	return (
		<section className={className}>
			<h3>{title}</h3>
			<div className="items">
				{items.map((item,index) => (
					<ItemComponent key={index} {...item} />
				))}
			</div>
		</section>
	);
};

export default styled(InfiniteBox)`
	.items {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 15px;
		@media (min-width: 300px) { grid-template-columns: repeat(2, 1fr); grid-gap: 17px;}
		@media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); grid-gap: 15px;}
		@media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); grid-gap: 20px;}
		@media (min-width: 1624px) { grid-template-columns: repeat(5, 1fr); grid-gap: 30px;}
	}
`;