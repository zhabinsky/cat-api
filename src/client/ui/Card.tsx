import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from '../ui';

interface Props {
    className?: string;
    children?: any;
    body?: any;
    picture: string;
    title: string;
    altText: string;
    url: string;
}

const Card: FunctionComponent<Props> = (props: Props) => {
    const { picture, title, url, className } = props;
    const [hovered, setMouseOver] = React.useState(false);

    const imageUrl = `/public-assets/${picture}`;
    const cardClassNames = classnames(className, {
        hover: hovered,
    });

    return (
        <article
            className={cardClassNames}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <Link href={url}>
                <div className="head">
                    <div className="avatar">{title[0]}</div>
                    <div className="title">{title}</div>
                </div>
                <div className="picture-container">
                    <div
                        className="picture"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                </div>
            </Link>
            <div className="body">{props.body}</div>
        </article>
    );
};

export default styled(Card)`
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    background: white;
    border-radius: 4px;

    .picture-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-top: 80%;
        cursor: pointer;

        .picture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background: rgba(0, 0, 0, 0.1);
            background-size: cover;
            transition: transform 0.5s ease-out;
            :hover {
                transform: scale(1.08);
            }
        }
    }

    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;
        overflow: hidden;
        position: relative;
        font-size: 1.25rem;
        flex-shrink: 0;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1;
        user-select: none;
        border-radius: 50%;
        margin-right: 13px;
        border: 1px solid gray;
        color: black;

        opacity: 0.4;
    }

    .head {
        display: flex;
        align-items: center;
        padding: 16px;
    }

    .body {
        font-size: 0.875rem;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        line-height: 1.43;
        letter-spacing: 0.01071em;
        color: rgba(0, 0, 0, 0.54);
        padding: 16px;
        position: relative;
    }
`;
