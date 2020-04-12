import classnames from 'classnames';
import debounce from 'lodash.debounce';
import React from 'react';
import styled from 'styled-components';
import { PrettyError } from '../../ui';
import Filters from './Filters';

const LazyGrid = (props: LazyGridProps) => {
    const {
        className,
        fetchItems,
        pageSize,
        itemComponent: ItemComponent,
        initialData = {
            items: [],
            totalCount: 0,
        },
    } = props;

    const [items, setItems] = React.useState(initialData.items);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasLoadedAll, setHasLoadedAll] = React.useState(false);
    const [totalCountItems, setTotalCountItems] = React.useState(
        initialData.totalCount,
    );
    const [search, setSearch] = React.useState('');

    const loadMore = async (
        searchValue: string,
        skipItems: number,
        limitItems: number,
        append: boolean = true,
    ) => {
        setIsLoading(true);

        const response = await fetchItems(searchValue, skipItems, limitItems);

        const {
            items: newItems,
            totalCount,
        } = (response as unknown) as LazyGridResponse;

        let newStateItems = newItems;
        if (append) {
            newStateItems = [...items, ...newItems];
        }

        if (newItems.length === 0 || newStateItems.length === totalCount) {
            setHasLoadedAll(true);
        }

        setItems(newStateItems);
        setTotalCountItems(totalCount);
        setIsLoading(false);
    };

    React.useEffect(() => {
        loadMore(search, 0, pageSize);
    }, []); // initial load

    React.useEffect(() => {
        window.onscroll = debounce(() => {
            let el = document.documentElement;
            if (el.scrollTop === 0) {
                el = document.body;

                // Safari and Chrome appear to have different behaviour
                // hence this little condition
            }
            if (window.innerHeight + el.scrollTop > el.offsetHeight - 500) {
                loadMore(search, items.length, pageSize);

                window.onscroll = undefined; // remove listener
            }
        }, 20);
    }, [items.length, isLoading, search]);

    const countItemsHidden = totalCountItems - items.length;

    return (
        <>
            <Filters
                onSearchChange={(input: string) => {
                    if (items.length === 0 && input.indexOf(search) === 0) {
                        // We know this query does not match any items
                        // we shall ignore it
                        return;
                    }
                    setSearch(input);
                    setHasLoadedAll(false);
                    loadMore(input, 0, pageSize, false);
                }}
            />
            <section className={classnames(className, { loading: isLoading })}>
                <div className="items">
                    {items.map((item, i) => (
                        <div className="item">
                            <ItemComponent key={i} {...item} />
                        </div>
                    ))}
                </div>
                <div className="infinite-box-status">
                    {!hasLoadedAll && <div className="loader" />}
                    {hasLoadedAll && (
                        <PrettyError>
                            <span>
                                {countItemsHidden === 0 &&
                                    'Welp, you have seen everything I had in the database...'}
                                {countItemsHidden > 0 && (
                                    <div>
                                        <h4>
                                            {items.length > 0
                                                ? "That's it, no more items satisfy your query.."
                                                : 'No items satisfy your query..'}
                                        </h4>
                                        <br />
                                        Change the filters to see{' '}
                                        {countItemsHidden} more items
                                    </div>
                                )}
                            </span>
                        </PrettyError>
                    )}
                </div>
            </section>
        </>
    );
};

export default styled(LazyGrid)`
    .item {
        text-align: center;
        & > * {
            display: inline-block;
            max-width: 300px;
        }
        @media (min-width: 550px) {
            max-width: unset;
            text-align: unset;
        }
    }

    .items {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 15px;

        @media (min-width: 550px) {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 17px;
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 18px;
        }
        @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
        }
    }

    .infinite-box-status {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 200px;
        padding: 0 20px;

        h4 {
            margin: 0;
        }
    }

    .loader {
        position: relative;
        background: url(/loader.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        transform-origin: center center;
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s ease-out;
        width: 80px;
        height: 80px;
        content: ' ';
    }

    &.loading .loader {
        opacity: 0.3;
        animation: animation-rotate 1s ease-out infinite;
    }
`;

// Lazy load logic inspired by: https://alligator.io/react/react-infinite-scroll/

export interface FetchItemsFunction {
    (search: string, skip: number, limit: number): Promise<LazyGridProps>;
}

export interface LazyGridResponse {
    items: Array<object>;
    totalCount: number;
}

export interface LazyGridProps {
    pageSize: number;
    className?: string;
    itemComponent: Function;
    fetchItems: FetchItemsFunction;
    initialData: LazyGridResponse;
}
