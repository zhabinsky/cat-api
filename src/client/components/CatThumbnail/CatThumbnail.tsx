import React from 'react';
import styled from 'styled-components';
import { Button, Card, Icons, Ripples } from '../../ui';
import useVoting from './useVoting';

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
            url="/cat"
            className={className}
            title={name}
            picture={picture}
            altText={`Breed: ${name}`}
            body={
                <>
                    <div className="origin">{origin.name}</div>
                    <div className="description">{description}</div>
                    <div className="like-section">
                        <Ripples>
                            <Button
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                    addVote();
                                }}
                            >
                                <Icons.Heart />
                            </Button>
                        </Ripples>
                        <div className="voices">{votesStatus}</div>
                    </div>
                </>
            }
        />
    );
};

export default styled(CatThumbnail)`
    user-select: none;

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
