import React from 'react';
import { LazyGrid, CatThumbnail } from '../components';
import { ConstrainWidth } from '../ui';
import { PageDecorator } from '../decorators';
import { CreateQueryFunction } from '../components/LazyGrid';

const createBreedsQuery = ((search: string, skip: number, limit: number) => `{
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
}`) as CreateQueryFunction;

const Page = () => (
    <PageDecorator>
        <ConstrainWidth>
            <LazyGrid
                className="cats"
                pageSize={12}
                itemComponent={CatThumbnail}
                createQuery={createBreedsQuery}
            />
        </ConstrainWidth>
    </PageDecorator>
);

export default Page;
