import React, { useContext } from 'react';
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

        Database.proposalsCollection.doc(proposal.id).set({
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

            <p>Is matched: {isMatched ? 'Yes' : 'No'}</p>

            <button type="button" onClick={handleSetResponse}>Change my response</button>
        </div>
    );
};
