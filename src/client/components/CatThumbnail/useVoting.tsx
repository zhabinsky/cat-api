import React from 'react';
import gq from '../../api/gq';
import { NotificationManager } from 'react-notifications';

const prettyPrintVotes = (votes: number) => {
    if (votes === 0) {
        return 'No votes yet';
    }
    const s = String(votes);
    const n = Number(s.slice(Math.min(0, s.length - 4)));

    if (s[s.length - 1] === '1' && n !== 11) {
        return `${votes} vote`;
    }
    return `${votes} votes`;
};

export default (_id: string, votesInit: number) => {
    const [votes, set] = React.useState(votesInit);
    const alterVotes = delta => set(Math.max(votesInit, votes + delta));
    const addVote = async () => {
        // we assume the vote will be counted
        alterVotes(1);

        try {
            await gq(`
                mutation Vote {
                    vote(_id: "${_id}") {
                        votes
                    }
                }
            `).then(() =>
                NotificationManager.success('Thank you for the vote!', 'Meow'),
            );
        } catch (err) {
            // our assumption was wrong, reverting likes
            alterVotes(-1);
        }
    };
    const votesStatus = prettyPrintVotes(votes);
    return [votesStatus, addVote] as const;
};
