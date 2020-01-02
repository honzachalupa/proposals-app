import React, { useState, useContext, useEffect } from 'react';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import './style';
import Item from './Item';

export default () => {
    const { currentUser } = useContext(Context);
    const [myProposals, setMyProposals] = useState<IProposal[]>([]);
    const [otherProposals, setOtherProposals] = useState<IProposal[]>([]);

    useEffect(() => {
        const unsubscribe_myProposals = Database.proposals.where('createdBy', '==', currentUser).onSnapshot(querySnapshot => {
            const proposals: IProposal[] = [];

            querySnapshot.forEach(doc => {
                proposals.push({
                    ...doc.data(),
                    id: doc.id
                } as IProposal);
            });

            setMyProposals(proposals);
        });

        const unsubscribe_otherProposals = Database.proposals.where('members', 'array-contains', currentUser).onSnapshot(querySnapshot => {
            const proposals: IProposal[] = [];

            querySnapshot.forEach(doc => {
                proposals.push({
                    ...doc.data(),
                    id: doc.id
                } as IProposal);
            });

            setOtherProposals(proposals);
        });

        return () => {
            unsubscribe_myProposals();
            unsubscribe_otherProposals();
        };
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
