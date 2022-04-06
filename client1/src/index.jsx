import React from "react";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { render } from 'react-dom';
import { history } from "./_helpers/history";
import {accountService} from "./_services/account.Service"
import {App} from "./app/Index"



// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() { 
  render(
      <Router history={history}>
          <App />
      </Router>,
      document.getElementById('root')
  );
}
reportWebVitals();
