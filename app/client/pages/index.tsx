import React from 'react';
import gq from '../api/gq';
import { GlobalStyles,InfiniteBox,CatThumbnail } from '../components';

const Page = ({ data }) => (
	<div className="hello">
		<GlobalStyles />
		<pre>
			{JSON.stringify(data,null,2)}
		</pre>
		<InfiniteBox
			title={'Breeds'}
			pageSize={8}
			itemComponent={CatThumbnail}
			createQuery={(skip: number,limit: number) => `{
				items: breedMany (limit:${limit}, skip:${skip}) {
					_id
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