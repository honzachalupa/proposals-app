import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Context, app } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import config from 'app-config';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_SignUp from 'Pages/SignUp';
import Page_SignIn from 'Pages/SignIn';
import Page_Create from 'Pages/Create';
import Page_NotFound from 'Pages/NotFound';

const App = () => {
    const [state, setState] = useState({
        currentUser: null
    });

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        Authentication.onAuthStateChanged(user => {
            setState(prevState => user && {
                ...prevState,
                currentUser: user.email
            });
        });
    }, []);

    const globalFunctions = {};

    return (
        <Context.Provider value={{ ...state, ...globalFunctions }}>
            <Router>
                <Switch>
                    <Route component={Page_Home} path="/" exact />
                    <Route component={Page_SignUp} path="/sign-up" exact />
                    <Route component={Page_SignIn} path="/sign-in" exact />
                    <Route component={Page_Create} path="/create" exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
