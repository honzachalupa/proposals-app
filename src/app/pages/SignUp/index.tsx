import React, { useState, FormEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Authentication } from 'Helpers';
import { ROOT } from 'Enums/routes';
import Layout from 'Layouts/Main';
import Button from 'Components/Button';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignUp = (e: FormEvent) => {
        e.preventDefault();

        if (password === passwordRepeat) {
            Authentication.createUserWithEmailAndPassword(emailAddress, password).then(() => {
                history.push(ROOT);
            }).catch(error => {
                alert(error);
            });
        } else {
            alert('Passwords are not matching.');
        }
    };

    return (
        <Layout>
            <h1>Sign Up</h1>

            <form className="form" data-component="SignUpForm" onSubmit={handleSignUp}>
                <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Password (repeat)" onChange={e => setPasswordRepeat(e.target.value)} />

                <Button className="yellow" label="Sign Up" type="submit" />
            </form>
        </Layout>
    );
});
