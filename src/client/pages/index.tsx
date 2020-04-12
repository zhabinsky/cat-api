import React from 'react';
import { CatThumbnail, LazyGrid } from '../components';
import { CreateQueryFunction } from '../components/LazyGrid/LazyGrid';
import { PageDecorator } from '../decorators';
import { ConstrainWidth } from '../ui';

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
                itemComponent={(props) => <CatThumbnail {...props} />}
                createQuery={createBreedsQuery}
            />
        </ConstrainWidth>
    </PageDecorator>
);

export default Page;
