import React, { useContext } from 'react';
import { Context } from '@honzachalupa/helpers';
import Layout from 'Layouts/Main';
import ProposalsList from 'Components/ProposalsList';
import Navigation from 'Components/Navigation';

export default () => {
    const { currentUser } = useContext(Context);

    return (
        <section>
            <Layout>
                <h1 className="page-title">ProposApp</h1>

                {currentUser && (
                    <ProposalsList />
                )}

                <Navigation />
            </Layout>
        </section>
    );
};
