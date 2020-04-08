import React from 'react';
import gq from '../api/gq';
import {
	GlobalStyles,
	InfiniteBox,
	CatThumbnail
} from '../components';

const Page = () => (
	<div>
		<GlobalStyles />
		<h1>Hello</h1>
		<InfiniteBox
			className=""
			title={'Breeds'}
			pageSize={12}
			itemComponent={CatThumbnail}
			createQuery={(skip: number,limit: number) => `{
				items: breedMany (limit:${limit}, skip:${skip}) {
					name
					picture
				}
			}`}
		/>
	</div >
);

Page.getInitialProps = async () => {
	const data = await gq(`{
		breedCount
		countryCount
	}`);
	return {
		data
	};
};

export default Page;