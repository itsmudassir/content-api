import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { Role } from "../_helpers/role";
import { accountService } from "../_services/account.Service";
import { Nav } from "../_components/Nav";
import { Alert } from "../_components/Alert";
import { PrivateRoute } from "../_components/PrivateRoute";
import { Home } from "../home/Index";
import { Profile } from "../profile/Index";
// import { Admin } from "../admin/Index";
import { User } from "../user/Index";
import PageHome from "../../containers/PageHome/PageHome";
import PageHome1 from "../../containers/PageHome/PageHome1";
import MainNav1 from "../../components/Header/MainNav1";
import ScrollToTop from "../../routers/ScrollToTop";
import PageSearch from "../../containers/PageSearch/PageSearch";
import PageDashboard from "../../containers/PageDashboard/PageDashboard";
import PageContentFeed from "../../containers/PageContentFeed/PageContentFeed";
import Analytics from "../../containers/Analytics/Analytics";
import TopicsPage from "../../containers/TopicsPage/TopicsPage";
import PageSingleTemplate3 from "../../containers/PageSingle/PageSingleTemp3"
import EditUserProfile from "../../containers/PageEditUserProfile/PageEditUserProfile" 

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={"app-container" + (user && " bg-light")}>
      <BrowserRouter>
        <ScrollToTop />
        <MainNav1 />

        <Switch>
          <Route exact path={`/`}>
            <Redirect to={`/discover`} />
          </Route>

          <PrivateRoute
            path={`/discover`}
            // component={PageHome}
            component={PageHome1}
          />

          <PrivateRoute
            exact
            path={`/discover/discover_content`}
            component={PageSearch}
          />

          <PrivateRoute path={"/content-feed"} component={PageContentFeed} />

          <PrivateRoute
            exact
            path={"/analytics"}
            component={Analytics}
          />

          <PrivateRoute
            exact
            path={"/mainpostpage/:id"}
            component={PageSingleTemplate3}
          />

          <PrivateRoute path={"/topics"} component={TopicsPage} />

          <PrivateRoute path={"/dashboard"} component={PageDashboard} />

          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />

          <PrivateRoute exact path="/user-profile" component={Home} />

          <PrivateRoute path="/profile" component={Profile} />
          
          <PrivateRoute path="/edit-profile" component={EditUserProfile} />

          {/* <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} /> */}

          <Route path="/user" component={User} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export { App };
