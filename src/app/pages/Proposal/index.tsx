import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import { ROOT } from 'Enums/routes';
import IProposal from 'Interfaces/Proposal';
import Layout from 'Layouts/Main';
import ProposalDetail from 'Components/ProposalDetail';

export default withRouter(({ match: { params: { id } }, history }: RouteComponentProps<{ id: string }>) => {
    const [proposal, setProposal] = useState<IProposal>();

    useEffect(() => {
        Database.proposals.doc(id).onSnapshot(doc => {
            if (doc.data()) {
                setProposal({
                    ...doc.data(),
                    id: doc.id
                } as IProposal);
            } else {
                history.push(ROOT);
            }
        });
    }, []);

    return proposal ? (
        <section>
            <Layout>
                {proposal && (
                    <ProposalDetail proposal={proposal} />
                )}
            </Layout>
        </section>
    ) : null;
});
