import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import { ROOT, PROPOSAL_DETAIL, PROPOSAL_EDIT } from 'Enums/routes';
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
                history.push(ROOT);
            }
        });
    }, []);

    return proposal ? (
        <section>
            <Layout>
                {path === PROPOSAL_DETAIL && (
                    <ProposalDetail proposal={proposal} />
                )}

                {path === PROPOSAL_EDIT && (
                    <EditProposalForm proposal={proposal} />
                )}
            </Layout>
        </section>
    ) : null;
});
