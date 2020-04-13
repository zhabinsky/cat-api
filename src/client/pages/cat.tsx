import React from 'react';
import styled from 'styled-components';
import { PageDecorator } from '../decorators';
import { ConstrainWidth } from '../ui';
import { CatThumbnail, CatDocs } from '../components';
import gq, { GQResponse } from '../api/gq';
import ErrorPage from './404';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Page = ({ className, cat, error = false }) => {
    if (error) {
        return <ErrorPage />;
    }

    return (
        <PageDecorator>
            <ConstrainWidth>
                <div className={className}>
                    <div className="cat-preview-container">
                        <CatThumbnail {...cat} className="cat-preview" />
                    </div>
                    <CatDocs className="docs" catId={cat._id} />
                </div>
            </ConstrainWidth>

            <NextSeo
                title={`${cat.name} | Cat API`}
                description={`View "${
                    cat.name
                }" and learn how to retrieve this breed from the API`}
                openGraph={{
                    title: `Check breed "${cat.name}"`,
                    description: `View "${
                        cat.name
                    }" and learn how to retrieve this breed from the API`,
                    images: [{ url: process.env.URL + '/' + cat.picture }],
                    site_name: 'CAT API',
                }}
            />
        </PageDecorator>
    );
};

const PageStyled = styled(Page)`
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    justify-content: center;

    .cat-preview-container {
        position: relative;
        margin-bottom: 20px;
        .cat-thumbnail {
            width: 350px;
            flex-shrink: 0;
        }
        @media (min-width: 700px) {
            .cat-preview {
                position: sticky;
                top: 20px;
            }
        }
    }

    .docs {
        display: inline-block;
        max-width: 300px;
        @media (min-width: 768px) {
            max-width: unset;
            text-align: unset;
        }
    }

    @media (min-width: 700px) {
        .cat-thumbnail {
            margin-top: 0px;
        }
        flex-direction: row;
        align-items: unset;
        .docs {
            margin: 0 20px 20px;
        }
    }

    h3 {
        margin-top: 0;
    }
` as NextPage;

PageStyled.getInitialProps = async context => {
    try {
        const _id = ((context.req as unknown) as Request).path.replace(
            '/cat/',
            '',
        );
        const response = await gq(`{
            cat: breedOne (filter: {_id: "${_id}"}) {\n _id\n name\n picture\n votes\n temperament\n description\n origin { \nname\n}}}`);

        const { cat } = ((response as GQResponse)
            .data as unknown) as CatResponse;

        if (!cat) {
            throw Error();
        }
        return {
            cat,
        };
    } catch (error) {
        context.res.statusCode = 404;
        return {
            error: true,
        };
    }
};

export default PageStyled;

interface CatResponse {
    cat: object;
}

interface Request {
    path: string;
}
