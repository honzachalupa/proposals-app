import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import { Authentication } from 'Helpers';
import { Routes } from 'Enums';
import './style';
import Button from 'Components/Button';

export default withRouter(({ history, ...rest }) => {
    const { currentUser } = useContext(Context);

    return (
        <nav data-component="Navigation" {...rest}>
            {currentUser ? (
                <React.Fragment>
                    <Button className="create-button green" label="Create proposal" onClick={() => history.push(Routes.CREATE_PROPOSAL)} />

                    <p className="user-email-address">Account: {currentUser}</p>

                    <Button label="Sign Out" onClick={() => Authentication.signOut()} />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Button className="yellow" label="Sign Up" onClick={() => history.push(Routes.SIGN_UP)} />
                    <Button className="yellow" label="Sign In" onClick={() => history.push(Routes.SIGN_IN)} />
                </React.Fragment>
            )}
        </nav>
    );
});
