import React from 'react';
import styled from 'styled-components';
import gq from '../api/gq';

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

const InfiniteBox = (props: Props) => {
	const { title,className,createQuery,pageSize,itemComponent: ItemComponent } = props;
	const [items,setItems] = React.useState([]);

	React.useEffect(() => {
		console.log('effect');
		gq(createQuery(items.length,pageSize)).then(({ items: newItems }) => {
			setItems([...items,...newItems]);
		});
	},[1]);

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