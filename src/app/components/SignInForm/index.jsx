import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Authentication } from 'Helpers';
import { ROOT } from 'Enums/routes';
import './style';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = e => {
        e.preventDefault();

        Authentication.signInWithEmailAndPassword(emailAddress, password).then(() => {
            history.push(ROOT);
        }).catch(error => {
            alert(error);
        });
    };

    return (
        <form data-component="SignInForm" onSubmit={handleSignIn}>
            <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    );
});
