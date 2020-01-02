import React, { useState } from 'react';
import { Database } from 'Helpers';
import Layout from 'Layouts/Main';
import ProposalDetail from 'Components/ProposalDetail';

export default ({ match: { params: { id } } }) => {
    const [proposal, setProposal] = useState();

    Database.proposals.doc(id).onSnapshot(doc => {
        setProposal(doc.data());
    });

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
