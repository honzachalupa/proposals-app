import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import { ROOT } from 'Enums/routes';
import './style';
import Button from 'Components/Button';
import Info from './Info';

interface IProps extends RouteComponentProps {
    proposal: IProposal;
}

export default withRouter(({ proposal, history }: IProps) => {
    const { currentUser } = useContext(Context);
    const isMatched = Object.values(proposal.responses).filter(reaction => !reaction).length === 0;

    const handleSetResponse = () => {
        const responses = { ...proposal.responses };

        responses[currentUser] = !responses[currentUser];

        Database.proposals.doc(proposal.id).set({
            ...proposal,
            updatedOn: Database.getTimestamp(),
            updatedBy: currentUser,
            responses
        });
    };

    const handleDelete = () => {
        Database.proposals.doc(proposal.id).delete().then(() => history.push(ROOT));
    };

    return proposal ? (
        <div data-component="ProposalDetail">
            <p className="headline">{proposal.content}</p>

            {proposal.description && (
                <p className="description">{proposal.description}</p>
            )}

            <Button className={cx('response-button', { 'positive-response': proposal.responses[currentUser], matched: isMatched })} onClick={handleSetResponse}>
                {isMatched ? <p className="match-status">It's a match!</p> : <p>Respond</p>}
            </Button>

            <Info {...proposal} />

            {proposal.createdBy === currentUser && (
                <Button className="delete-button" label="Delete" onClick={handleDelete} />
            )}
        </div>
    ) : null;
});
