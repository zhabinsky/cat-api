import React from 'react';
import { CatThumbnail, LazyGrid } from '../components';
import { PageDecorator } from '../decorators';
import { ConstrainWidth } from '../ui';
import gq, { GQResponse } from '../api/gq';
import {
    FetchItemsFunction,
    LazyGridResponse,
    LazyGridFilterType,
} from '../components/LazyGrid/LazyGrid';
import { NextSeo } from 'next-seo';

const PAGE_SIZE = 12;

const fetchBreeds = ((async (skip: number, limit: number, filters: object) => {
    const stringifyFilters = () =>
        Object.keys(filters)
            .map(parameterName => {
                return `${parameterName}: "${filters[parameterName]}"`;
            })
            .join(', ');

    const query = `{
        totalCount: breedCount
        items: breedSearch (limit:${limit}, skip:${skip}, ${stringifyFilters()}) {
            _id
            name
            picture
            description
            votes
            temperament
            origin {
                name
            }
        }
    }`;
    const response = await gq(query);
    return (response as GQResponse).data as LazyGridResponse;
}) as unknown) as FetchItemsFunction;

const Page = ({ breedsInitial, countryOptions }) => (
    <PageDecorator>
        <ConstrainWidth>
            <LazyGrid
                className="cats"
                pageSize={PAGE_SIZE}
                itemComponent={CatThumbnail}
                fetchItems={fetchBreeds}
                initialData={breedsInitial}
                aria-label="Cat breeds"
                filters={[
                    {
                        type: LazyGridFilterType.Input,
                        title: 'Search by name..',
                        parameterName: 'search',
                        defaultValue: '',
                    },
                    {
                        type: LazyGridFilterType.Select,
                        title: 'breed origin',
                        parameterName: 'origin',
                        options: [
                            {
                                key: 'Any country',
                                value: '',
                            },
                            ...countryOptions,
                        ],
                    },
                ]}
            />
        </ConstrainWidth>
        <NextSeo
            title={`${breedsInitial.totalCount} cat breeds | Cat API`}
            description={`API that allows you to fetch random cat breeds`}
        />
    </PageDecorator>
);

Page.getInitialProps = async () => {
    const countries = (await gq(`{
        countries: countryMany {
          key: name
          value: _id
        }
    }`)) as GQResponse;
    return {
        breedsInitial: await fetchBreeds(0, PAGE_SIZE, { search: '' }),
        countryOptions: (countries.data as CountriesResponse).countries,
    };
};

export default Page;

export interface CountriesResponse {
    countries: [];
}
