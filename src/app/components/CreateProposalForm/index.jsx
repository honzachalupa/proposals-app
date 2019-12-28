import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import { ROOT } from 'Enums/routes';
import './style';

export default withRouter(({ history }) => {
    const { currentUser } = useContext(Context);
    const [content, setContent] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [members, setMembers] = useState('');

    const filterMembers = members => {
        return members.map(member => member.trim());
    };

    const composeProposal = () => {
        const membersFiltered = filterMembers(members.split(','));

        const responses = {
            [currentUser]: false
        };

        membersFiltered.forEach(member => {
            responses[member] = false;
        });

        return {
            content,
            lifeSpan,
            members: membersFiltered,
            responses,
            createdBy: currentUser,
            createdAt: Database.getTimestamp()
        };
    };

    const handleCreate = e => {
        e.preventDefault();

        Database.proposals.add(composeProposal());

        history.push(ROOT);
    };

    return (
        <form data-component="CreateProposalForm" onSubmit={handleCreate}>
            <input type="text" placeholder="Proposal" onChange={e => setContent(e.target.value)} />
            <input type="number" placeholder="Life span (in minutes)" onChange={e => setLifeSpan(e.target.value)} />
            <input type="text" placeholder="Members (separated with comma)" onChange={e => setMembers(e.target.value)} />
            <button type="submit">Create</button>
        </form>
    );
});
