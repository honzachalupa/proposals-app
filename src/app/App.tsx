/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Context, app } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import { Routes } from 'Enums';
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
                    <Route path={Routes.INDEX} component={Page_Home} />
                    <Route path={Routes.ROOT} component={Page_Home} exact />
                    <Route path={Routes.SIGN_UP} component={Page_SignUp} exact />
                    <Route path={Routes.SIGN_IN} component={Page_SignIn} exact />
                    <Route path={Routes.CREATE_PROPOSAL} component={Page_CreateProposal} exact />
                    <Route path={Routes.PROPOSAL_DETAIL} component={Page_ProposalDetail} exact />
                    <Route path={Routes.PROPOSAL_EDIT} component={Page_ProposalDetail} exact />
                    <Route component={Page_NotFound} />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
