import React, { useContext } from 'react';
import moment from 'moment';
import { Context } from '@honzachalupa/helpers';
import IProposal from 'Interfaces/Proposal';
import './style';

export default ({ members, createdBy, createdOn, updatedOn }: IProposal) => {
    const { currentUser } = useContext(Context);
    const membersFiltered = members.filter(member => member !== currentUser);

    return (
        <aside data-component="ProposalDetail_Info">
            {updatedOn && (
                <p>Updated on: {moment(updatedOn.toDate()).format('D.M.YYYY H:mm')}</p>
            )}

            {createdOn && (
                <p>Created on: {moment(createdOn.toDate()).format('D.M.YYYY H:mm')}</p>
            )}''

            {createdBy !== currentUser && (
                <p>Create by: {createdBy}</p>
            )}

            {membersFiltered.length > 0 && (
                <p>Members: {membersFiltered.join(', ')}</p>
            )}
        </aside>
    );
};
