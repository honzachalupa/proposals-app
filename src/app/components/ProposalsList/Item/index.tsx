import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { Context } from '@honzachalupa/helpers';
import { Routes } from 'Enums';
import './style';
import Button from 'Components/Button';
import IProposal from 'Interfaces/Proposal';

export default withRouter(({ history, id, content, responses, isSensitive }: RouteComponentProps & IProposal) => {
    const { currentUser } = useContext(Context);

    const isMatched = Object.values(responses).filter(reaction => !reaction).length === 0;

    return (
        <div data-component="ProposalsList_Item">
            <Button
                className={cx('button', { 'positive-response': responses[currentUser], matched: isMatched })}
                label={!isSensitive ? content : '(sensitive label)'}
                onClick={() => history.push(Routes.PROPOSAL_DETAIL.replace(':id', id))}
            />
        </div>
    );
});
