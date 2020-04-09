import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import gq from '../api/gq';
import debounce from 'lodash.debounce';

interface CreateQueryFunction {
    (skip: number, limit: number): string;
}

interface Props {
    title: string;
    pageSize: number;
    className?: string;
    itemComponent: Function;
    createQuery: CreateQueryFunction;
}

// Inspiration: https://alligator.io/react/react-infinite-scroll/

interface InfiniteBoxResponse {
    items: Array<object>;
}

const InfiniteBox = (props: Props) => {
    const {
        title,
        className,
        createQuery,
        pageSize,
        itemComponent: ItemComponent,
    } = props;
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const loadMore = () => {
        setIsLoading(true);
        gq(createQuery(items.length, pageSize)).then(
            (response: InfiniteBoxResponse) => {
                const { items: newItems } = response;
                setItems([...items, ...newItems]);
                setIsLoading(false);
            },
        );
    };

    React.useEffect(loadMore, []);
    React.useEffect(() => {
        if (isLoading) {
            window.onscroll = undefined; // we are not going to listen to scroll while items are loading
        } else {
            window.onscroll = debounce(() => {
                if (
                    window.innerHeight + document.documentElement.scrollTop ===
                    document.documentElement.offsetHeight
                ) {
                    loadMore();
                }
            }, 100);
        }
    }, [items.length, isLoading]); // onScroll will change when: items.length is different or isLoading has changed

    return (
        <React.Fragment>
            <section className={classnames(className, { loading: isLoading })}>
                <h3>{title}</h3>
                <div className="items">
                    {items.map((item, index) => (
                        <ItemComponent key={index} {...item} />
                    ))}
                </div>
                <div className="loader-container">
                    <div className="loader" />
                </div>
            </section>
        </React.Fragment>
    );
};

export default styled(InfiniteBox)`
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

    /* // TODO: move to separate component */

    .loader-container {
        display: flex;
        justify-content: center;
        margin: 50px 0;
        position: relative;
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

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg) scale(0.7);
        }
        to {
            transform: rotate(360deg);
        }
    }

    &.loading .loader {
        opacity: 1;
        transform: scale(1);
        animation: rotating 1s ease-out infinite;
    }
`;
