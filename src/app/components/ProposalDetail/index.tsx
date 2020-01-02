import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import { ROOT } from 'Enums/routes';
import './style';
import Button from 'Components/Button';

interface IProps extends RouteComponentProps {
    proposal: IProposal;
}

export default withRouter(({ proposal, history }: IProps) => {
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

    const handleDelete = () => {
        Database.proposals.doc(proposal.id).delete().then(() => history.push(ROOT));
    };

    return proposal ? (
        <div data-component="ProposalDetail">
            <h2>{proposal.content}</h2>

            {proposal.description && (
                <p>Description: {proposal.description}</p>
            )}

            <Button className={cx('response-button', { 'response-yes': proposal.responses[currentUser], 'is-match': isMatched })} onClick={handleSetResponse}>
                {isMatched ? (
                    <p className="match-status">It's a match!</p>
                ) : (
                    <p>Respond</p>
                )}
            </Button>

            {proposal.createdBy !== currentUser && (
                <p>Create by: {proposal.createdBy}</p>
            )}

            {membersFiltered.length > 0 && (
                <p>Members: {membersFiltered.join(', ')}</p>
            )}

            <Button label="Delete" onClick={handleDelete} />
        </div>
    ) : null;
});