import React from 'react';
import { CatThumbnail, LazyGrid } from '../components';
import { PageDecorator } from '../decorators';
import { ConstrainWidth } from '../ui';
import gq, { GQResponse } from '../api/gq';
import {
    FetchItemsFunction,
    LazyGridResponse,
} from '../components/LazyGrid/LazyGrid';
import { NextSeo } from 'next-seo';

const PAGE_SIZE = 12;

const fetchBreeds = async (search: string, skip: number, limit: number) => {
    const response = await gq(`{
        totalCount: breedCount
        items: breedSearch (search:"${search}", limit:${limit}, skip:${skip}) {
            _id
            name
            picture
            description
            votes
            origin {
                name
            }
        }
    }`);

    return (response as GQResponse).data as LazyGridResponse;
};

const Page = ({ breedsInitial }) => (
    <PageDecorator>
        <ConstrainWidth>
            <LazyGrid
                className="cats"
                pageSize={PAGE_SIZE}
                itemComponent={CatThumbnail}
                fetchItems={(fetchBreeds as unknown) as FetchItemsFunction}
                initialData={breedsInitial as LazyGridResponse}
                aria-label="Cat breeds"
            />
        </ConstrainWidth>

        <NextSeo
            title={`${breedsInitial.totalCount} cat breeds | Cat API`}
            description={`API that allows you to fetch random cat breeds`}
        />
    </PageDecorator>
);

Page.getInitialProps = async () => {
    return {
        breedsInitial: await fetchBreeds('', 0, PAGE_SIZE),
    };
};

export default Page;
