import React from 'react';
import styled from 'styled-components';
import { Button, Card } from '../../ui';
import useVoting from './useVoting';
import { FaHeart } from 'react-icons/fa';

interface CountryObject {
    name: string;
    capital: string;
}

interface ThumbnailProps {
    picture: string;
    name: string;
    votes: number;
    _id: string;
    temperament: string;
    description: string;
    className: string;
    origin: CountryObject;
}

const CatThumbnail = (props: ThumbnailProps) => {
    const {
        picture,
        name,
        description,
        className,
        temperament,
        votes,
        _id,
        origin,
    } = props;

    const [votesStatus, addVote] = useVoting(_id, votes);

    return (
        <Card
            aria-label={`Cat breed "${name}"`}
            url={`/cat/${_id}`}
            className={`cat-thumbnail ${className}`}
            title={name}
            picture={picture}
            body={
                <>
                    <div className="origin">{origin.name}</div>
                    <div className="description">{description}</div>
                    <div className="like-section">
                        <Button
                            aria-label={`Vote for breed "${name}"`}
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                addVote();
                            }}
                        >
                            <FaHeart />
                        </Button>
                        <div className="voices">{votesStatus}</div>
                    </div>
                </>
            }
        />
    );
};

export default styled(CatThumbnail)`
    user-select: none;

    display: inline-block;
    max-width: 300px;
    @media (min-width: 768px) {
        max-width: unset;
        text-align: unset;
    }

    .origin {
        position: absolute;
        bottom: 100%;
        right: 0;
        padding: 3px;
        color: white;
        background: rgba(0, 0, 0, 0.3);
        text-align: right;
        font-size: 11px;
    }

    .description {
        height: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .like-section {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: black;
        margin-top: 10px;
        .voices {
            margin-left: 15px;
        }
        button {
            margin: 5px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            padding: unset;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                width: 20px;
                height: 20px;
            }
            svg {
                height: 18px;
                width: 18px;
                fill: gray;
            }
        }
    }
`;
