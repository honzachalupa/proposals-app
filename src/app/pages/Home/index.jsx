import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import Layout from 'Layouts/Main';
import ProposalsList from 'Components/ProposalsList';

export default withRouter(({ history }) => {
    console.log('Page_Home updated');

    const { currentUser } = useContext(Context);

    return (
        <section>
            <Layout>
                {currentUser ? (
                    <React.Fragment>
                        <p>{currentUser}</p>

                        <button type="button" onClick={() => Authentication.signOut()}>Sign Out</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button type="button" onClick={() => history.push('/sign-up')}>Sign Up</button>
                        <button type="button" onClick={() => history.push('/sign-in')}>Sign In</button>
                    </React.Fragment>
                )}


                {currentUser && (
                    <ProposalsList />
                )}
            </Layout>
        </section>
    );
});
