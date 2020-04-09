import React from 'react';
import gq from '../api/gq';
import { GlobalStyles, InfiniteBox, CatThumbnail } from '../components';

const Page = () => (
    <React.Fragment>
        <GlobalStyles />
        <h1>Cat API</h1>
        <InfiniteBox
            title={'Breeds'}
            pageSize={12}
            itemComponent={CatThumbnail}
            createQuery={(skip: number, limit: number) => `{
				items: breedMany (limit:${limit}, skip:${skip}) {
					name
					picture
					description
				}
			}`}
        />
    </React.Fragment>
);

Page.getInitialProps = async () => {
    const data = await gq(`{
		breedCount
		countryCount
	}`);
    return {
        data,
    };
};

export default Page;
