import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import { ROOT } from 'Enums/routes';
import IProposal from 'Interfaces/Proposal';
import './style';
import Button from 'Components/Button';

export default withRouter(({ history }) => {
    const { currentUser } = useContext(Context);
    const [content, setContent] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lifeSpan, setLifeSpan] = useState<number>(0);
    const [members, setMembers] = useState<string>('');

    const filterMembers = (members: string[]) => {
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
            id: '',
            content,
            description,
            lifeSpan,
            members: membersFiltered,
            responses,
            createdBy: currentUser,
            createdAt: Database.getTimestamp()
        } as IProposal;
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        Database.proposals.add(composeProposal());

        history.push(ROOT);
    };

    return (
        <form className="form" data-component="CreateProposalForm" onSubmit={handleCreate}>
            <h2 className="headline">Create a new proposal...</h2>

            <input type="text" placeholder="Proposal *" onChange={e => setContent(e.target.value)} required />
            <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <input type="number" placeholder="Life span (in minutes)" onChange={e => setLifeSpan(Number(e.target.value))} />
            <input type="text" placeholder="Members (separated with comma) *" onChange={e => setMembers(e.target.value)} required />

            <Button className="green" label="Create" type="submit" />
        </form>
    );
});