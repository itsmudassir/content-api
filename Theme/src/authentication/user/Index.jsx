import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { accountService } from '../_services/account.Service';
import { Login } from './Login';
import PageLogin from "../../containers/PageLogin/PageLogin"
import { Register } from './Register';
import PageSignUp from "../../containers/PageSignUp/PageSignUp"
import PageForgotPass from "../../containers/PageForgotPass/PageForgotPass"
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import PageResetPassword from "../../containers/PageResetPassword/pageResetPassword"

function User({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <div className="card m-3">
                        <Switch>
                            {/* <Route path={`${path}/login`} component={Login} /> */}
                            <Route path={`${path}/login`} component={PageLogin} />
                            {/* <Route path={`${path}/register`} component={Register} /> */}
                            <Route path={`${path}/register`} component={PageSignUp} />
                            {/* <Route path={`${path}/verify-email`} component={VerifyEmail} /> */}
                            {/* <Route path={`${path}/forgot-password`} component={ForgotPassword} /> */}
                            <Route path={`${path}/forgot-password`} component={PageForgotPass} />
                            <Route path={`${path}/reset-password`} component={PageResetPassword} />
                            {/* <Route path={`${path}/reset-password`} component={ResetPassword} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { User };