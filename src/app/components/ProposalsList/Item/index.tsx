import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { PROPOSAL_DETAIL } from 'Enums/routes';
import './style';
import Button from 'Components/Button';

interface IProps extends RouteComponentProps {
    id: string;
    content: string;
    responses: any;
}

export default withRouter(({ history, id, content, responses }: IProps) => {
    const isMatched = Object.values(responses).filter(reaction => !reaction).length === 0;

    return (
        <div className={cx({ matched: isMatched })} data-component="ProposalsList_Item">
            <Button label={content} onClick={() => history.push(PROPOSAL_DETAIL.replace(':id', id))} />
        </div>
    );
});
