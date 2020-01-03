import React, { useState, FormEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { Authentication } from 'Helpers';
import { ROOT } from 'Enums/routes';
import Layout from 'Layouts/Main';
import Button from 'Components/Button';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e: FormEvent) => {
        e.preventDefault();

        Authentication.signInWithEmailAndPassword(emailAddress, password).then(() => {
            history.push(ROOT);
        }).catch(error => {
            alert(error);
        });
    };

    return (
        <Layout>
            <h1>Sign In</h1>

            <form className="form" data-component="SignInForm" onSubmit={handleSignIn}>
                <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <Button className="yellow" label="Sign In" type="submit" />
            </form>
        </Layout>
    );
});
