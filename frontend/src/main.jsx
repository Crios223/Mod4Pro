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




// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { Provider } from "react-redux";

// import configureStore from "./store/store.js";
// import { restoreCSRF, csrfFetch } from "./store/csrf.js";
// import * as sessionActions from "./store/session";

// const store = configureStore();

// //if (import.meta.env.MODE !== "production") {    NOTE: add for production
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions; // <-- ADD THIS LINE
// //}


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );


// // frontend/src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { Provider } from "react-redux";
// import configureStore from "./store/store.js";

// import { restoreCSRF, csrfFetch } from "./store/csrf.js";
// import * as sessionActions from "./store/session";

// import { ModalProvider, Modal } from "./context/Modal";

// // const store = configureStore();

// // /* ------------------------------------------------------------------ */
// // /*  Dev‑only helpers: expose store + csrfFetch for console debugging   */
// // /* ------------------------------------------------------------------ */
// // const isProd = import.meta.env.MODE === "production"; // Vite flag
// // if (!isProd) {
// //   restoreCSRF();

// //   window.csrfFetch      = csrfFetch;
// //   window.store          = store;
// //   window.sessionActions = sessionActions;
// // }
// /* ------------------------------------------------------------------ */
// const store = configureStore();
// console.log("Vite mode is", import.meta.env.MODE);   // ← add this

// const isProd = import.meta.env.MODE === "production";
// if (!isProd) {
//   console.log("Dev helpers attached");               // easy visual cue
//   restoreCSRF();
//   window.csrfFetch      = csrfFetch;
//   window.store          = store;
//   window.sessionActions = sessionActions;
// }



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ModalProvider>
//       <Provider store={store}>
//         <App />
//         <Modal /> {/* portal target — keep sibling to App */}
//       </Provider>
//     </ModalProvider>
//   </React.StrictMode>
// );



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