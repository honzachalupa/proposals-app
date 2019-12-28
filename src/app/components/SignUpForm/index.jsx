import React, { useState } from 'react';
import { Authentication } from 'Helpers';
import './style';

export default () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignUp = e => {
        e.preventDefault();

        if (password === passwordRepeat) {
            Authentication.createUserWithEmailAndPassword(emailAddress, password).then(() => {
                alert('Account created.');
            }).catch(error => {
                alert(error);
            });
        } else {
            alert('Passwords are not matching.');
        }
    };

    return (
        <form data-component="SignUpForm" onSubmit={handleSignUp}>
            <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Password (repeat)" onChange={e => setPasswordRepeat(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    );
};
