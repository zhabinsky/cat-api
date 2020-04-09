import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Button, Card } from '../ui';
import gq from '../api/gq';

interface ThumbnailProps {
    picture: string;
    name: string;
    votes: number;
    _id: string;
    temperament: string;
    description: string;
    className: string;
}

const vote = (_id: string) => {
    return gq(`
        mutation VoteForTheCat {
            vote(_id: "${_id}") {
                votes
            }
        }
    `);
};

const CatThumbnail = (props: ThumbnailProps) => {
    const {
        picture,
        name,
        description,
        className,
        temperament,
        votes,
        _id,
    } = props;

    const [currentVotes, setCurrentVotes] = React.useState(votes);

    const alterVotes = alternation => {
        setCurrentVotes(Math.max(votes, currentVotes + alternation));
    };

    return (
        <Card
            className={className}
            title={name}
            picture={picture}
            altText={`Breed: ${name}`}
            body={
                <React.Fragment>
                    <div className="description">{description}</div>
                    <div className="like-section">
                        <Button
                            square={true}
                            backgroundColor={'coral'}
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                alterVotes(1);
                                vote(_id).catch(() => {
                                    /**
                                     * Error while voting,
                                     * lets revert our assumption and decrease votes
                                     */
                                    alterVotes(-1);
                                });
                            }}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </Button>
                        {prettyPrintVotes(currentVotes)}
                    </div>
                </React.Fragment>
            }
        />
    );
};

const prettyPrintVotes = (votes: number) => {
    if (votes === 0) {
        return 'Vote for me';
    }
    const s = String(votes);
    const n = Number(s.slice(Math.min(0, s.length - 4)));

    if (s[s.length - 1] === '1' && n !== 11) {
        return `${votes} human has voted`;
    }
    return `${votes} people have voted`;
};

export default styled(CatThumbnail)`
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

    background: white;
    border-radius: 4px;

    .avatar {
        width: 40px;
        height: 40px;
        display: flex;
        overflow: hidden;
        position: relative;
        font-size: 1.25rem;
        align-items: center;
        flex-shrink: 0;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1;
        user-select: none;
        border-radius: 50%;
        justify-content: center;
        margin-right: 13px;
        background: coral;
        color: white;
    }

    .head {
        display: flex;
        align-items: center;
    }

    .like-section {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: black;
        margin-top: 10px;
        button {
            margin-right: 15px;
        }
    }

    .main {
        font-size: 0.875rem;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        line-height: 1.43;
        letter-spacing: 0.01071em;
        width: 50%;
        white-space: wrap;
        color: black;
    }

    .body {
        font-size: 0.875rem;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        line-height: 1.43;
        letter-spacing: 0.01071em;
        color: rgba(0, 0, 0, 0.54);
    }

    .description {
        height: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .picture {
        width: 100%;
        position: relative;
        overflow: hidden;
        padding-top: 80%;
        cursor: pointer;
    }

    img {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        transform-origin: top center;
        transition: opacity 0.5s ease-in;
    }

    &.animations-allowed {
        img {
            transition: all 0.5s ease-out;
        }
    }

    &.loading img,
    &.loading .body {
        opacity: 0;
    }

    h4 {
        margin: 0;
    }

    .head,
    .body {
        padding: 16px;
    }

    svg {
        fill: white;
    }
`;
