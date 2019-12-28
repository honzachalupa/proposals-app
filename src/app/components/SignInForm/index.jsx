import React, { useState } from 'react';
import { Authentication } from 'Helpers';
import './style';

export default () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = e => {
        e.preventDefault();

        Authentication.signInWithEmailAndPassword(emailAddress, password).then(() => {
            alert('Welcome back.');
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
};
