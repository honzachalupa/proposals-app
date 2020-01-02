import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import IProposal from 'Interfaces/Proposal';
import Layout from 'Layouts/Main';
import ProposalDetail from 'Components/ProposalDetail';

export default ({ match: { params: { id } } }: RouteComponentProps<{ id: string }>) => {
    const [proposal, setProposal] = useState<IProposal>();

    useEffect(() => {
        Database.proposals.doc(id).onSnapshot(doc => {
            setProposal({
                ...doc.data(),
                id: doc.id
            } as IProposal);
        });
    }, []);

    return (
        <section>
            <Layout>
                <h1>Proposal Detail</h1>

                {proposal && (
                    <ProposalDetail proposal={proposal} />
                )}
            </Layout>
        </section>
    );
};
