import React, { useState, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import './style';
import Button from 'Components/Button';

interface IProps extends RouteComponentProps {
    proposal: IProposal;
}

export default withRouter(({ proposal, history }: IProps) => {
    const { currentUser } = useContext(Context);

    const [content, setContent] = useState<string>(proposal.content);
    const [description, setDescription] = useState<string>(proposal.description);
    const [lifeSpan, setLifeSpan] = useState<number>(proposal.lifeSpan);
    const [members, setMembers] = useState<string>(proposal.members.join(','));
    const [isSensitive, setIsSensitive] = useState<boolean>(proposal.isSensitive);

    const filterMembers = (members: string[]) => {
        return members.map(member => member.trim());
    };

    const composeProposal = () => {
        const membersFiltered = filterMembers(members.split(','));

        return {
            ...proposal,
            content,
            description,
            lifeSpan,
            members: membersFiltered,
            isSensitive,
            updatedOn: Database.getTimestamp(),
            updatedBy: currentUser
        } as IProposal;
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        Database.proposals.doc(proposal.id).set(composeProposal());

        history.goBack();
    };

    return (
        <form className="form" data-component="EditProposalForm" onSubmit={handleSave}>
            <h2 className="headline">Edit</h2>

            <input type="text" placeholder="Proposal *" defaultValue={content} onChange={e => setContent(e.target.value)} required />
            <input type="text" placeholder="Description" defaultValue={description} onChange={e => setDescription(e.target.value)} />
            <input type="number" placeholder="Life span (in hours)" defaultValue={lifeSpan} onChange={e => setLifeSpan(Number(e.target.value))} />
            <input type="text" placeholder="Members (separated with comma) *" defaultValue={members} onChange={e => setMembers(e.target.value)} required />
            <label htmlFor="is-sensitive">
                <input type="checkbox" defaultChecked={isSensitive} onChange={e => setIsSensitive(e.target.checked)} name="is-sensitive" />
                <span className="label">Has sensitive label?</span>
            </label>

            <Button className="green" label="Save changes" type="submit" />
        </form>
    );
});
