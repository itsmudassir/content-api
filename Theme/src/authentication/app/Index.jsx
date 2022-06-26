import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { accountService } from "../_services/account.Service";
import { PrivateRoute } from "../_components/PrivateRoute";
import { Home } from "../home/Index";
import { Profile } from "../profile/Index";
import { User } from "../user/Index";
import PageHome1 from "../../containers/PageHome/PageHome1";
import MainNav1 from "../../components/Header/MainNav1";
import ScrollToTop from "../../routers/ScrollToTop";
import PageSearch from "../../containers/PageSearch/PageSearch";
import PageSearchMain from "../../containers/PageSearch/PageSearchMain";
import PageDashboard from "../../containers/PageDashboard/PageDashboard";
import Analytics from "../../containers/Analytics/Analytics";
import TopicsPage from "../../containers/TopicsPage/TopicsPage";
import PageSingleTemplate3 from "../../containers/PageSingle/PageSingleTemp3";
import EditUserProfile from "../../containers/PageEditUserProfile/PageEditUserProfile";
import SidebarMobile from "../../components/SidebarMobile/SidebarMobile";

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
        <MainNav1 isTop={true} />
        <Switch>

          <Route exact path={`/`}>
            <Redirect to={`/discover/discover_search`} />
          </Route>


          <PrivateRoute
            exact
            path={`/discover/discover_search`}
            component={PageHome1}
          />

          <PrivateRoute
            exact
            path={`/discover/discover_content`}
            component={PageSearchMain}
          />

          <PrivateRoute
            path={"/discover/dicover_insights"}
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

          <Route path="/user" component={User} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export { App };
