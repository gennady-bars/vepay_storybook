import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Layout from "../../containers/Layout/Layout";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import store from "../../redux/store.ts";

function App() {
  return (
    <div>
      <Provider store={store}>
       {/*  "homepage": "https://gennady-bars.github.io/vepay-admin/", */}
        {/* <BrowserRouter basename='/vepay-admin'> */}
        <BrowserRouter>
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
