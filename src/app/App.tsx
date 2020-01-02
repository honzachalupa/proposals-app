/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Context, app } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import { ROOT, SIGN_UP, SIGN_IN, CREATE_PROPOSAL, PROPOSAL_DETAIL } from 'Enums/routes';
import config from 'app-config';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_SignUp from 'Pages/SignUp';
import Page_SignIn from 'Pages/SignIn';
import Page_CreateProposal from 'Pages/Create';
import Page_ProposalDetail from 'Pages/Proposal';
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
                    <Route component={Page_Home} path={ROOT} exact />
                    <Route component={Page_SignUp} path={SIGN_UP} exact />
                    <Route component={Page_SignIn} path={SIGN_IN} exact />
                    <Route component={Page_CreateProposal} path={CREATE_PROPOSAL} exact />
                    <Route component={Page_ProposalDetail} path={PROPOSAL_DETAIL} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
