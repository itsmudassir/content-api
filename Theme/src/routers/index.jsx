import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import PageSearch from "../containers/PageSearch/PageSearch";
import ScrollToTop from "./ScrollToTop";
import Footer from "../components/Footer/Footer";
import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import PageForgotPass from "../containers/PageForgotPass/PageForgotPass";
import PageDashboard from "../containers/PageDashboard/PageDashboard";
import MainNav1 from "../components/Header/MainNav1";
import PageHome from "../containers/PageHome/PageHome";
import Analytics from "../containers/Analytics/Analytics";
import TopicsPage from "../containers/TopicsPage/TopicsPage";
import { PrivateRoute } from "../authentication/_components/PrivateRoute";

const Routes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MainNav1 />

        <Switch>
          <Route exact path={`/`}>
            <Redirect to={`/discover/discover_search`} />
          </Route>

          <PrivateRoute
            exact
            path={`/discover/discover_search`}
            component={PageHome}
          />
          <PrivateRoute
            exact
            path={`${path}/discover/discover_content`}
            component={PageSearch}
          />
          <Route path={"/login"} component={PageLogin} />
          <Route path={"/signup"} component={PageSignUp} />
          <Route path={"/forgot-pass"} component={PageForgotPass} />
          <PrivateRoute path={"/dashboard"} component={PageDashboard} />
          {/* <Route path={"/search"} component={PageSearch} /> */}
          {/* <Route path={"/search-v2"} component={PageSearchV2} /> */}
          <PrivateRoute path={"/discover/dicover_insights"} component={Analytics} />
          {/* <Route path={"/:id"} component={SingleCard} /> */}
          <PrivateRoute path={path+"/topics"} component={TopicsPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Routes;
