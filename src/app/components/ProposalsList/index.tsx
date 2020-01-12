import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Context } from '@honzachalupa/helpers';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import './style';
import Item from './Item';

export default () => {
    const { currentUser } = useContext(Context);
    const [myProposals, setMyProposals] = useState<IProposal[]>([]);
    const [otherProposals, setOtherProposals] = useState<IProposal[]>([]);

    const getProposals = (queryParameters: [string, any, string], setStateCallback: (proposals: IProposal[]) => void) => {
        Database.proposals.where(queryParameters[0], queryParameters[1], queryParameters[2]).onSnapshot(querySnapshot => {
            const proposals: IProposal[] = [];

            querySnapshot.forEach(doc => {
                proposals.push({
                    ...doc.data(),
                    id: doc.id
                } as IProposal);
            });

            setStateCallback(proposals);
        });
    };

    const setLifeSpanCheck = () => {
        [...myProposals, ...otherProposals].forEach(proposal => {
            const updatedAgo = moment.duration(moment().diff(proposal.updatedOn.toDate()));
            const updatedAgoHours = (updatedAgo.hours() * 60 + updatedAgo.minutes()) / 60;

            if (updatedAgoHours > proposal.lifeSpan) {
                const responses = {};

                Object.keys(proposal.responses).forEach(emailAddress => {
                    responses[emailAddress] = false;
                });

                Database.proposals.doc(proposal.id).set({
                    ...proposal,
                    responses,
                    updatedOn: Database.getTimestamp()
                });
            }
        });
    };

    useEffect(() => {
        getProposals(['createdBy', '==', currentUser], setMyProposals);
        getProposals(['members', 'array-contains', currentUser], setOtherProposals);

        setLifeSpanCheck();

        setInterval(() => setLifeSpanCheck, 10000);
    }, []);

    useEffect(() => {
        setLifeSpanCheck();
    }, [myProposals, otherProposals]);

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
