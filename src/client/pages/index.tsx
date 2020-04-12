import React from 'react';
import { CatThumbnail, LazyGrid } from '../components';
import { PageDecorator } from '../decorators';
import { ConstrainWidth } from '../ui';
import gq from '../api/gq';
import {
    FetchItemsFunction,
    LazyGridResponse,
} from '../components/LazyGrid/LazyGrid';

const PAGE_SIZE = 12;

const fetchBreeds = ((search: string, skip: number, limit: number) => {
    return gq(`{
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
}) as FetchItemsFunction;

const Page = ({ breedsInitial }) => (
    <PageDecorator>
        <ConstrainWidth>
            <LazyGrid
                className="cats"
                pageSize={PAGE_SIZE}
                itemComponent={CatThumbnail}
                fetchItems={fetchBreeds}
                initialData={breedsInitial as LazyGridResponse}
            />
        </ConstrainWidth>
    </PageDecorator>
);

Page.getInitialProps = async () => {
    return {
        breedsInitial: await fetchBreeds('', 0, PAGE_SIZE),
    };
};

export default Page;
