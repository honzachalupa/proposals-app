import React, { useContext } from 'react';
import { Context } from '@honzachalupa/helpers';
import IProposal from 'Interfaces/Proposal';
import './style';

export default ({ members, createdBy }: IProposal) => {
    const { currentUser } = useContext(Context);
    const membersFiltered = members.filter(member => member !== currentUser);

    return (
        <aside data-component="ProposalDetail_Info">
            {/* {updatedOn && (
                <p>Updated on: {moment(updatedOn.toDate()).format('D.M.YYYY H:mm')}</p>
            )} */}

            {/* {createdOn && (
                <p>Created on: {moment(createdOn.toDate()).format('D.M.YYYY H:mm')}</p>
            )} */}

            {createdBy !== currentUser && (
                <p>Create by: {createdBy}</p>
            )}

            {membersFiltered.length > 0 && (
                <p>{membersFiltered.length === 1 ? 'Member' : 'Members'}: {membersFiltered.join(', ')}</p>
            )}
        </aside>
    );
};
