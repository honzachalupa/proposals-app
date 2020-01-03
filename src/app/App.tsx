/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Context, app } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import { INDEX, ROOT, SIGN_UP, SIGN_IN, CREATE_PROPOSAL, PROPOSAL_DETAIL, PROPOSAL_EDIT } from 'Enums/routes';
import config from 'app-config';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_SignUp from 'Pages/SignUp';
import Page_SignIn from 'Pages/SignIn';
import Page_CreateProposal from 'Pages/Proposal/Create';
import Page_ProposalDetail from 'Pages/Proposal/Detail';
import Page_NotFound from 'Pages/NotFound';

interface IState {
    currentUser: string | null;
}

const App = () => {
    const [state, setState] = useState<IState>({
        currentUser: null
    });

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        Authentication.onAuthStateChanged(user => {
            setState(prevState => ({
                ...prevState,
                currentUser: user && user.email
            }));
        });
    }, []);

    const globalFunctions = {};

    return (
        <Context.Provider value={{ ...state, ...globalFunctions }}>
            <Router basename={__BASENAME__}>
                <Switch>
                    <Route path={INDEX} component={Page_Home} />
                    <Route path={ROOT} component={Page_Home} exact />
                    <Route path={SIGN_UP} component={Page_SignUp} exact />
                    <Route path={SIGN_IN} component={Page_SignIn} exact />
                    <Route path={CREATE_PROPOSAL} component={Page_CreateProposal} exact />
                    <Route path={PROPOSAL_DETAIL} component={Page_ProposalDetail} exact />
                    <Route path={PROPOSAL_EDIT} component={Page_ProposalDetail} exact />
                    <Route component={Page_NotFound} />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
