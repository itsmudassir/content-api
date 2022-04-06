import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./app/store.js";
//import Error boundry
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SearchkitProvider, SearchkitClient } from "@searchkit/client";
import { ErrorBoundary } from "react-error-boundary";

import { Router, BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { history } from "./authentication/_helpers/history";
import { accountService } from "./authentication/_services/account.Service";
import { App } from "./authentication/app/Index";

// styles
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

const skClient = new SearchkitClient({
  itemsPerPage: 20,
});

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <SearchkitProvider client={skClient}>
//         <Provider store={store}>
//           <PersistGate persistor={persistor} loading={null}>
//             <ApolloProvider client={client}>
//               <SearchkitProvider client={skClient}>
//                 <ErrorBoundary
//                   FallbackComponent={ErrorFallback}
//                   // onError={(error, errorInfo) => console.log({ error, errorInfo })}
//                 >
//                   <BrowserRouter>
//                     <App />
//                   </BrowserRouter>
//                 </ErrorBoundary>
//               </SearchkitProvider>
//             </ApolloProvider>
//           </PersistGate>
//         </Provider>
//       </SearchkitProvider>
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// AUTHEnTICATION APP

function startApp() {
  render(
    
    <React.StrictMode>
    <ApolloProvider client={client}>
      <SearchkitProvider client={skClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <ApolloProvider client={client}>
              <SearchkitProvider client={skClient}>
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  // onError={(error, errorInfo) => console.log({ error, errorInfo })}
                >
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ErrorBoundary>
              </SearchkitProvider>
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </SearchkitProvider>
    </ApolloProvider>
  </React.StrictMode>
    ,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
