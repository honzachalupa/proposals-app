import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import { SIGN_UP, SIGN_IN, CREATE_PROPOSAL } from 'Enums/routes';
import Layout from 'Layouts/Main';
import ProposalsList from 'Components/ProposalsList';

export default withRouter(({ history }) => {
    const { currentUser } = useContext(Context);

    return (
        <section>
            <Layout>
                {currentUser ? (
                    <React.Fragment>
                        <p>{currentUser}</p>

                        <button type="button" onClick={() => history.push(CREATE_PROPOSAL)}>Create proposal</button>
                        <button type="button" onClick={() => Authentication.signOut()}>Sign Out</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button type="button" onClick={() => history.push(SIGN_UP)}>Sign Up</button>
                        <button type="button" onClick={() => history.push(SIGN_IN)}>Sign In</button>
                    </React.Fragment>
                )}


                {currentUser && (
                    <ProposalsList />
                )}
            </Layout>
        </section>
    );
});
