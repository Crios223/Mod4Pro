// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import './index.css';
// import configureStore from './store';

// const store = configureStore();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import configureStore from "./store/store.js";
import { restoreCSRF, csrfFetch } from "./store/csrf.js";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();               // sets XSRF‑TOKEN cookie
  window.csrfFetch = csrfFetch; // expose for console tests
  window.store     = store;    // expose Redux store
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
