// // import { createStore, combineReducers, applyMiddleware, compose } from 
// // 'redux';
// // import thunk from 'redux-thunk';


// // const rootReducer = combineReducers({

// // });


// // let enhancer;
// // if (import.meta.env.MODE === 'production') {
// //   enhancer = applyMiddleware(thunk);
// // } else {
// //   const logger = (await import("redux-logger")).default;
// //   const composeEnhancers =
// //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// //   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// // }



// // const configureStore = (preloadedState) => {
// //     return createStore(rootReducer, preloadedState, enhancer);
// // };




// import { createStore, combineReducers, applyMiddleware, compose} from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { createLogger } from "redux-logger";

// const rootReducer = combineReducers({
//   // add slice reducers here
// });

// const middleware = [thunk];
// if (import.meta.env.MODE !== "production") {
//   middleware.push(createLogger({ collapsed: true }));
// }

// const enhancer =
//   import.meta.env.MODE === "production"
//     ? applyMiddleware(...middleware)                
//     : composeWithDevTools(applyMiddleware(...middleware)); 

// export default function configureStore(preloadedState) {
//   return createStore(rootReducer, preloadedState, enhancer);
// }



// // export default configureStore;



import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
  // add slice reducers here later
});

let enhancer;

if (import.meta.env.MODE === "production") {
  // 1) production: just thunk
  enhancer = applyMiddleware(thunk);
} else {
  // 2) development: thunk + logger + Redux DevTools enhancer
  const logger = (await import("redux-logger")).default;

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// ---- configure & export the store -----------------
export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}