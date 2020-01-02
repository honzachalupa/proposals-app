import React, { useState, useContext, useEffect } from 'react';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import './style';
import Item from './Item';

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
                <div className="group">
                    <h2 className="headline">Created by me</h2>

                    {myProposals.map(proposal => (
                        <Item key={proposal.id} {...proposal} />
                    ))}
                </div>
            )}

            {otherProposals.length > 0 && (
                <div className="group">
                    <h2 className="headline">Created by others</h2>

                    {otherProposals.map(proposal => (
                        <Item key={proposal.id} {...proposal} />
                    ))}
                </div>
            )}
        </div>
    );
};
