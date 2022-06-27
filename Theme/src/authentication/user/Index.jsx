import React, { useEffect } from "react";
import { Route, Redirect, Switch ,useLocation} from "react-router-dom";
import { accountService } from "../_services/account.Service";
import PageLogin from "../../containers/PageLogin/PageLogin";
import PageSignUp from "../../containers/PageSignUp/PageSignUp";
import PageForgotPass from "../../containers/PageForgotPass/PageForgotPass";
import PageResetPassword from "../../containers/PageResetPassword/pageResetPassword";
import PageContactUs from "../../containers/PageContactUs/PageContactUs";
import PageSubscription from "../../containers/PageSubscription/PageSubscription";
import LandingPage from "../../containers/LandingPage/LandingPage";

function User({ history, match }) {
    const { pathname } = useLocation();

  const { path } = match;

  useEffect(() => {
    // redirect to home if already logged in
    if (accountService.userValue) {
      history.push("/");
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card m-3">
            <Switch>
              <Route path={`${path}/login`} component={PageLogin} />
              <Route path={`${path}/register`} component={PageSignUp} />
              <Route
                path={`${path}/forgot-password`}
                component={PageForgotPass}
              />
              <Route
                path={`${path}/reset-password`}
                component={PageResetPassword}
              />
              <Route path={`${path}/contact-us`} component={PageContactUs} />
              <Route
                path={`${path}/subscription`}
                component={PageSubscription}
              />

              <Route path={`${path}/home`} component={LandingPage} />

              <Redirect from="*" to="/" />

              <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export { User };
