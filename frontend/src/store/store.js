// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import sessionReducer from "./session";




// const rootReducer = combineReducers({
//   session: sessionReducer       
// });


// let enhancer;
// if (import.meta.env.MODE === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import("redux-logger")).default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// // const configureStore = (preloadedState) => {
// //   return createStore(rootReducer, preloadedState, enhancer);
// // };

// // export default configureStore;

// export default function configureStore(preloadedState) {
//   return createStore(rootReducer, preloadedState, enhancer);
// }


// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import sessionReducer from './session';
// import spotsReducer from './spots';

// const rootReducer = combineReducers({
//   session: sessionReducer,
//   spots:   spotsReducer
// });

// let enhancer;
// if (import.meta.env.MODE === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import('redux-logger')).default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// export default function configureStore(preloadedState) {
//   return createStore(rootReducer, preloadedState, enhancer);
// }



import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews'

// Combine session and spots reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  spots:   spotsReducer,
  reviews: reviewsReducer,
});

// Configure middleware and Redux DevTools
let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Create and export the store instance directly
const store = createStore(rootReducer, enhancer);

export default store;
