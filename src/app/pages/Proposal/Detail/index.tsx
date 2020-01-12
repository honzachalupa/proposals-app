import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import { Routes } from 'Enums';
import IProposal from 'Interfaces/Proposal';
import Layout from 'Layouts/Main';
import ProposalDetail from 'Components/ProposalDetail';
import EditProposalForm from 'Components/EditProposalForm';

export default withRouter(({ match: { path, params: { id } }, history }: RouteComponentProps<{ id: string }>) => {
    console.log(path);

    const [proposal, setProposal] = useState<IProposal>();

    useEffect(() => {
        Database.proposals.doc(id).onSnapshot(doc => {
            if (doc.data()) {
                setProposal({
                    ...doc.data(),
                    id: doc.id
                } as IProposal);
            } else {
                history.push(Routes.ROOT);
            }
        });
    }, []);

    return proposal ? (
        <section>
            <Layout>
                {path === Routes.PROPOSAL_DETAIL && (
                    <ProposalDetail proposal={proposal} />
                )}

                {path === Routes.PROPOSAL_EDIT && (
                    <EditProposalForm proposal={proposal} />
                )}
            </Layout>
        </section>
    ) : null;
});
