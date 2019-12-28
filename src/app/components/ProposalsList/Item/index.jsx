import React, { useContext } from 'react';
import cx from 'classnames';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import './style';

export default proposal => {
    const { currentUser } = useContext(Context);
    const membersFiltered = proposal.members.filter(member => member !== currentUser);
    const isMatched = Object.values(proposal.responses).filter(reaction => !reaction).length === 0;

    const handleSetResponse = () => {
        const responses = { ...proposal.responses };

        responses[currentUser] = !responses[currentUser];

        Database.proposals.doc(proposal.id).set({
            ...proposal,
            responses
        });
    };

    return (
        <div data-component="ProposalsList_Item">
            <p>Proposal: {proposal.content}</p>

            {proposal.createdBy !== currentUser && (
                <p>Create by: {proposal.createdBy}</p>
            )}

            {membersFiltered.length > 0 && (
                <p>Members: {membersFiltered.join(', ')}</p>
            )}

            <button
                className={
                    cx(
                        'response-button', {
                            'response-yes': proposal.responses[currentUser],
                            'is-matched': isMatched
                        }
                    )}
                type="button"
                onClick={handleSetResponse}
            >
                {isMatched && (
                    <p className="match-status">It's match!</p>
                )}
                Respond
            </button>
        </div>
    );
};
