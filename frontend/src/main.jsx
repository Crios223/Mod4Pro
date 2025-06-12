import React from "react";
import ReactDOM from "react-dom/client";
import 'normalize.css';
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store.js";      


import { restoreCSRF, csrfFetch } from "./store/csrf.js";
import * as sessionActions from "./store/session";

import { ModalProvider, Modal } from "./context/Modal";

const isProd = import.meta.env.MODE === "production";
if (!isProd) {
  restoreCSRF();
  window.csrfFetch      = csrfFetch;
  window.store          = store;
  window.sessionActions = sessionActions;
}




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);