import React, { useState, useContext, useEffect } from 'react';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import './style';
import Proposal from './Item';

export default () => {
    const { currentUser } = useContext(Context);
    const [myProposals, setMyProposals] = useState([]);
    const [otherProposals, setOtherProposals] = useState([]);

    useEffect(() => {
        Database.proposals.where('createdBy', '==', currentUser).onSnapshot(querySnapshot => {
            const proposals = [];

            querySnapshot.forEach(doc => {
                proposals.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setMyProposals(proposals);
        });

        Database.proposals.where('members', 'array-contains', currentUser).onSnapshot(querySnapshot => {
            const proposals = [];

            querySnapshot.forEach(doc => {
                proposals.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setOtherProposals(proposals);
        });
    }, []);

    return (
        <div data-component="ProposalsList">
            {myProposals.length > 0 && (
                <React.Fragment>
                    <h2>Created by me</h2>
                    {myProposals.map(proposal => (
                        <Proposal key={proposal.id} {...proposal} />
                    ))}
                </React.Fragment>
            )}

            {otherProposals.length > 0 && (
                <React.Fragment>
                    <h2>Created by others</h2>
                    {otherProposals.map(proposal => (
                        <Proposal key={proposal.id} {...proposal} />
                    ))}
                </React.Fragment>
            )}
        </div>
    );
};
