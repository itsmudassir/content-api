import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Role } from "../_helpers/role";
import { accountService } from "../_services/account.Service";
import { Nav } from "../_components/Nav";
import { Alert } from "../_components/Alert";
import { PrivateRoute } from "../_components/PrivateRoute";
import { Home } from "../home/Index";
import { Profile } from "../profile/Index";
// import { Admin } from "../admin/Index";
import { User } from "../user/Index";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={"app-container" + (user && " bg-light")}>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        {/* <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} /> */}
        <Route path="/user" component={User} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export { App };
