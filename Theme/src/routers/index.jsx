import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageSearch from "../containers/PageSearch/PageSearch";
import ScrollToTop from "./ScrollToTop";
import Footer from "../components/Footer/Footer";
import PageLogin from "../containers/PageLogin/PageLogin";
import PageSignUp from "../containers/PageSignUp/PageSignUp";
import PageForgotPass from "../containers/PageForgotPass/PageForgotPass";
import PageDashboard from "../containers/PageDashboard/PageDashboard";
import PageSearchV2 from "../containers/PageSearch/PageSearchV2";
import MainNav1 from "../components/Header/MainNav1";
import PageContentFeed from "../containers/PageContentFeed/PageContentFeed";
import PageHome from "../containers/PageHome/PageHome";
import Analytics from "../containers/Analytics/Analytics";
import TopicsPage from "../containers/TopicsPage/TopicsPage";
import PageSingleTemplate3 from "../containers/PageSingle/PageSingleTemp3";

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainNav1 />

      <Switch>
        <Route exact path="/">
          <Redirect to="/discover/discover_search" />
        </Route>
        <Route exact path={"/discover/discover_search"} component={PageHome} />
        <Route
          exact
          path={"/discover/discover_content"}
          component={PageSearch}
        />
        <Route
          exact
          path={"/discover/discover_content/mainpostpage/:id"}
          component={PageSingleTemplate3}
        />
        <Route path={"/login"} component={PageLogin} />
        <Route path={"/signup"} component={PageSignUp} />
        <Route path={"/forgot-pass"} component={PageForgotPass} />
        <Route path={"/dashboard"} component={PageDashboard} />
        {/* <Route path={"/search"} component={PageSearch} /> */}
        {/* <Route path={"/search-v2"} component={PageSearchV2} /> */}
        <Route path={"/content-feed"} component={PageContentFeed} />
        <Route path={"/discover/dicover_insights"} component={Analytics} />
        {/* <Route path={"/:id"} component={SingleCard} /> */}
        <Route path={"/topics"} component={TopicsPage} />
      </Switch>
      <Footer />

    </BrowserRouter>
  );
};

export default Routes;
