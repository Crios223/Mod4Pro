// import { csrfFetch } from './csrf';

// // action types
// const LOAD_REVIEWS   = 'reviews/LOAD_REVIEWS';
// const ADD_REVIEW     = 'reviews/ADD_REVIEW';
// const REMOVE_REVIEW  = 'reviews/REMOVE_REVIEW';

// // action creators
// const loadReviews   = reviews => ({ type: LOAD_REVIEWS, reviews });
// const addReview     = review  => ({ type: ADD_REVIEW, review });
// const removeReview  = id      => ({ type: REMOVE_REVIEW, id });

// // thunks
// export const fetchReviews = spotId => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadReviews(data.Reviews));
//   }
// };

// export const createReview = (spotId, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const review = await res.json();
//     dispatch(addReview(review));
//     return review;
//   } else {
//     throw res;
//   }
// };

// export const deleteReview = reviewId => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });
//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//   } else {
//     throw res;
//   }
// };

// // reducer
// const initialState = { bySpot: {} };

// export default function reviewsReducer(state = initialState, action) {
//   const newState = { bySpot: { ...state.bySpot } };

//   switch (action.type) {
//     case LOAD_REVIEWS:
//       newState.bySpot = {};
//       action.reviews.forEach(r => {
//         if (!newState.bySpot[r.spotId]) newState.bySpot[r.spotId] = {};
//         newState.bySpot[r.spotId][r.id] = r;
//       });
//       return newState;

//     case ADD_REVIEW:
//       if (!newState.bySpot[action.review.spotId]) newState.bySpot[action.review.spotId] = {};
//       newState.bySpot[action.review.spotId][action.review.id] = action.review;
//       return newState;

//     case REMOVE_REVIEW:
//       for (const spotId in newState.bySpot) {
//         if (newState.bySpot[spotId][action.id]) {
//           delete newState.bySpot[spotId][action.id];
//         }
//       }
//       return newState;

//     default:
//       return state;
//   }
// }

// import { csrfFetch } from './csrf';

// // action types
// const LOAD_REVIEWS        = 'reviews/LOAD_REVIEWS';
// const ADD_REVIEW          = 'reviews/ADD_REVIEW';
// const REMOVE_REVIEW       = 'reviews/REMOVE_REVIEW';
// const LOAD_USER_REVIEWS   = 'reviews/LOAD_USER_REVIEWS';

// // action creators
// const loadReviews      = reviews => ({ type: LOAD_REVIEWS, reviews });
// const addReview        = review  => ({ type: ADD_REVIEW, review });
// const removeReview     = id      => ({ type: REMOVE_REVIEW, id });
// const loadUserReviews  = reviews => ({ type: LOAD_USER_REVIEWS, reviews });

// // thunks
// export const fetchReviews = spotId => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadReviews(data.Reviews));
//   }
// };

// export const createReview = (spotId, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const review = await res.json();
//     dispatch(addReview(review));
//     return review;
//   } else {
//     throw res;
//   }
// };

// export const deleteReview = reviewId => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });
//   if (res.ok) {
//     dispatch(removeReview(reviewId));
//   } else {
//     throw res;
//   }
// };

// // ← new thunk to get current user's reviews
// // export const fetchUserReviews = () => async dispatch => {
// //   const res = await csrfFetch('/api/reviews/current');
// //   if (res.ok) {
// //     const data = await res.json(); // { Reviews: [...] }
// //     dispatch(loadUserReviews(data.Reviews));
// //   }
// //   return res;
// // };

// export const fetchUserReviews = () => async dispatch => {
//   const res = await csrfFetch('/api/reviews/current');
//   if (res.ok) {
//     const data = await res.json();
//     console.log('🛠️ fetchUserReviews got:', data);   // ← add this
//     dispatch(loadUserReviews(data.Reviews));
//   }
//   return res;
// };






// // reducer
// const initialState = {
//   bySpot: {},
//   currentUser: {}    // ← track the current user's reviews
// };

// export default function reviewsReducer(state = initialState, action) {
//   const newState = {
//     bySpot: { ...state.bySpot },
//     currentUser: { ...state.currentUser }
//   };

//   switch (action.type) {
//     case LOAD_REVIEWS:
//       newState.bySpot = {};
//       action.reviews.forEach(r => {
//         if (!newState.bySpot[r.spotId]) newState.bySpot[r.spotId] = {};
//         newState.bySpot[r.spotId][r.id] = r;
//       });
//       return newState;

//     case ADD_REVIEW:
//       if (!newState.bySpot[action.review.spotId]) newState.bySpot[action.review.spotId] = {};
//       newState.bySpot[action.review.spotId][action.review.id] = action.review;
//       return newState;

//     case REMOVE_REVIEW:
//       // remove from bySpot
//       for (const spotId in newState.bySpot) {
//         if (newState.bySpot[spotId][action.id]) {
//           delete newState.bySpot[spotId][action.id];
//         }
//       }
//       // also remove from currentUser if present
//       delete newState.currentUser[action.id];
//       return newState;

//     case LOAD_USER_REVIEWS:
//       newState.currentUser = {};
//       action.reviews.forEach(r => {
//         newState.currentUser[r.id] = r;
//       });
//       return newState;

//     default:
//       return state;
//   }
// }


// reviews.js (Redux store)
// import { csrfFetch } from './csrf';

// // Action Types
// const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
// const ADD_REVIEW = 'reviews/ADD_REVIEW';
// const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
// const LOAD_USER_REVIEWS = 'reviews/LOAD_USER_REVIEWS';

// // Action Creators
// export const loadReviews = (reviews, spotId) => ({
//   type: LOAD_REVIEWS,
//   reviews,
//   spotId
// });

// export const addReview = review => ({
//   type: ADD_REVIEW,
//   review
// });

// export const removeReview = (id, spotId) => ({
//   type: REMOVE_REVIEW,
//   id,
//   spotId
// });

// export const loadUserReviews = reviews => ({
//   type: LOAD_USER_REVIEWS,
//   reviews
// });

// // Thunks
// export const fetchReviews = spotId => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    
//     if (res.ok) {
//       const data = await res.json();
//       console.log('Fetched reviews for spot:', data);
//       dispatch(loadReviews(data.Reviews, spotId));
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//   }
// };

// export const createReview = (spotId, payload) => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//       method: 'POST',
//       body: JSON.stringify(payload)
//     });
    
//     if (res.ok) {
//       const review = await res.json();
//       dispatch(addReview(review));
//       return review;
//     }
//   } catch (error) {
//     console.error('Error creating review:', error);
//     throw error;
//   }
// };

// export const deleteReview = reviewId => async dispatch => {
//   try {
//     // First, we need to get the spotId for this review to update both parts of state
//     const reviewRes = await csrfFetch(`/api/reviews/${reviewId}`);
//     let spotId;
    
//     if (reviewRes.ok) {
//       const reviewData = await reviewRes.json();
//       spotId = reviewData.spotId;
//     }
    
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//       method: 'DELETE'
//     });
    
//     if (res.ok) {
//       dispatch(removeReview(reviewId, spotId));
//       return { success: true };
//     }
//   } catch (error) {
//     console.error('Error deleting review:', error);
//     throw error;
//   }
// };

// export const fetchUserReviews = () => async dispatch => {
//   try {
//     const res = await csrfFetch('/api/reviews/current');
    
//     if (res.ok) {
//       const data = await res.json();
//       console.log('🛠️ fetchUserReviews got:', data);
      
//       if (data && Array.isArray(data.Reviews)) {
//         dispatch(loadUserReviews(data.Reviews));
//       } else {
//         console.error('Expected Reviews array in response, got:', data);
//       }
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching user reviews:', error);
//   }
// };

// // Initial State with correct nested structure
// const initialState = {
//   bySpot: {},       // Reviews organized by spotId
//   currentUser: {},  // Reviews by the current user
//   isLoading: false
// };

// // Helper to normalize array into an object with IDs as keys
// const normalizeData = (array) => {
//   if (!Array.isArray(array)) return {};
  
//   const normalized = {};
//   array.forEach(item => {
//     if (item && item.id) {
//       normalized[item.id] = item;
//     }
//   });
//   return normalized;
// };

// // Reducer
// const reviewsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_REVIEWS: {
//       // Make sure we have valid data and spotId
//       if (!action.reviews || !action.spotId) return state;
      
//       // Create new state with updated bySpot for this spotId
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [action.spotId]: normalizeData(action.reviews)
//         }
//       };
//     }
    
//     case ADD_REVIEW: {
//       if (!action.review || !action.review.id || !action.review.spotId) return state;
      
//       const { id, spotId } = action.review;
      
//       // Update both bySpot and currentUser sections
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [spotId]: {
//             ...(state.bySpot[spotId] || {}),
//             [id]: action.review
//           }
//         },
//         // Also add to currentUser section if this is the user's review
//         currentUser: {
//           ...state.currentUser,
//           [id]: action.review
//         }
//       };
//     }
    
//     case REMOVE_REVIEW: {
//       // Update both sections of state
//       const newState = { ...state };
      
//       // Remove from bySpot if spotId is provided
//       if (action.spotId && newState.bySpot[action.spotId]) {
//         newState.bySpot = { ...newState.bySpot };
//         newState.bySpot[action.spotId] = { ...newState.bySpot[action.spotId] };
//         delete newState.bySpot[action.spotId][action.id];
//       }
      
//       // Remove from currentUser section
//       newState.currentUser = { ...newState.currentUser };
//       delete newState.currentUser[action.id];
      
//       return newState;
//     }
    
//     case LOAD_USER_REVIEWS: {
//       // Make sure we have an array of reviews
//       if (!Array.isArray(action.reviews)) {
//         console.error('LOAD_USER_REVIEWS received non-array:', action.reviews);
//         return state;
//       }
      
//       // Normalize the reviews array
//       const normalizedReviews = normalizeData(action.reviews);
      
//       // Create new state with updated currentUser section
//       return {
//         ...state,
//         currentUser: normalizedReviews
//       };
//     }
    
//     default:
//       return state;
//   }
// };

// export default reviewsReducer;


// import { csrfFetch } from './csrf';

// // Action Types
// const LOAD_REVIEWS        = 'reviews/LOAD_REVIEWS';
// const ADD_REVIEW          = 'reviews/ADD_REVIEW';
// const REMOVE_REVIEW       = 'reviews/REMOVE_REVIEW';
// const LOAD_USER_REVIEWS   = 'reviews/LOAD_USER_REVIEWS';

// // Action Creators
// export const loadReviews = (reviews, spotId) => ({
//   type: LOAD_REVIEWS,
//   reviews,
//   spotId
// });

// export const addReview = review => ({
//   type: ADD_REVIEW,
//   review
// });

// export const removeReview = (id, spotId) => ({
//   type: REMOVE_REVIEW,
//   id,
//   spotId
// });

// export const loadUserReviews = reviews => ({
//   type: LOAD_USER_REVIEWS,
//   reviews
// });

// // Thunks
// export const fetchReviews = spotId => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(loadReviews(data.Reviews, spotId));
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//   }
// };

// export const createReview = (spotId, payload) => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//       method: 'POST',
//       body: JSON.stringify(payload)
//     });
//     if (res.ok) {
//       const review = await res.json();
//       dispatch(addReview(review));
//       return review;
//     }
//   } catch (error) {
//     console.error('Error creating review:', error);
//     throw error;
//   }
// };

// // UPDATED deleteReview thunk:
// export const deleteReview = (reviewId, spotId = null) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });
//   if (res.ok) {
//     dispatch(removeReview(reviewId, spotId));
//     return { success: true };
//   } else {
//     // pull out any JSON error, or throw generic
//     let err;
//     try { err = await res.json(); } catch { err = { message: 'Delete failed' }; }
//     throw err;
//   }
// };

// export const fetchUserReviews = () => async dispatch => {
//   try {
//     const res = await csrfFetch('/api/reviews/current');
//     if (res.ok) {
//       const data = await res.json();
//       if (Array.isArray(data.Reviews)) {
//         dispatch(loadUserReviews(data.Reviews));
//       } else {
//         console.error('Expected Reviews array, got:', data);
//       }
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching user reviews:', error);
//   }
// };

// // Initial State
// const initialState = {
//   bySpot: {},       // { [spotId]: { [reviewId]: review, ... }, ... }
//   currentUser: {},  // { [reviewId]: review, ... }
//   isLoading: false
// };

// // Helper to normalize an array into { id: item, ... }
// const normalizeData = array => {
//   if (!Array.isArray(array)) return {};
//   return array.reduce((obj, item) => {
//     if (item.id) obj[item.id] = item;
//     return obj;
//   }, {});
// };

// // Reducer
// export default function reviewsReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOAD_REVIEWS: {
//       if (!action.spotId || !action.reviews) return state;
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [action.spotId]: normalizeData(action.reviews)
//         }
//       };
//     }
//     case ADD_REVIEW: {
//       const review = action.review;
//       if (!review || !review.id) return state;
//       const { id, spotId } = review;
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [spotId]: {
//             ...(state.bySpot[spotId] || {}),
//             [id]: review
//           }
//         },
//         currentUser: {
//           ...state.currentUser,
//           [id]: review
//         }
//       };
//     }
//     case REMOVE_REVIEW: {
//       const { id, spotId } = action;
//       const newState = { ...state };

//       // remove from bySpot[spotId]
//       if (spotId && newState.bySpot[spotId]) {
//         newState.bySpot = { ...newState.bySpot };
//         newState.bySpot[spotId] = { ...newState.bySpot[spotId] };
//         delete newState.bySpot[spotId][id];
//       }

//       // remove from currentUser
//       newState.currentUser = { ...newState.currentUser };
//       delete newState.currentUser[id];

//       return newState;
//     }
//     case LOAD_USER_REVIEWS: {
//       if (!Array.isArray(action.reviews)) return state;
//       return {
//         ...state,
//         currentUser: normalizeData(action.reviews)
//       };
//     }
//     default:
//       return state;
//   }
// }





// import { csrfFetch } from './csrf';

// // Action Types
// const LOAD_REVIEWS        = 'reviews/LOAD_REVIEWS';
// const ADD_REVIEW          = 'reviews/ADD_REVIEW';
// const REMOVE_REVIEW       = 'reviews/REMOVE_REVIEW';
// const LOAD_USER_REVIEWS   = 'reviews/LOAD_USER_REVIEWS';

// // Action Creators
// export const loadReviews = (reviews, spotId) => ({
//   type: LOAD_REVIEWS,
//   reviews,
//   spotId
// });

// export const addReview = review => ({
//   type: ADD_REVIEW,
//   review
// });

// export const removeReview = (id, spotId) => ({
//   type: REMOVE_REVIEW,
//   id,
//   spotId
// });

// export const loadUserReviews = reviews => ({
//   type: LOAD_USER_REVIEWS,
//   reviews
// });

// // Thunks
// export const fetchReviews = spotId => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(loadReviews(data.Reviews, spotId));
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//   }
// };

// export const createReview = (spotId, payload) => async dispatch => {
//   try {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//       method: 'POST',
//       body: JSON.stringify(payload)
//     });
//     if (res.ok) {
//       const review = await res.json();
//       dispatch(addReview(review));
//       return review;
//     }
//   } catch (error) {
//     console.error('Error creating review:', error);
//     throw error;
//   }
// };

// // UPDATED deleteReview thunk:
// export const deleteReview = (reviewId, spotId = null) => async dispatch => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: 'DELETE'
//   });
//   if (res.ok) {
//     dispatch(removeReview(reviewId, spotId));
//     return { success: true };
//   } else {
//     let err;
//     try { err = await res.json(); } catch { err = { message: 'Delete failed' }; }
//     throw err;
//   }
// };

// export const fetchUserReviews = () => async dispatch => {
//   try {
//     // append timestamp to bypass 304 caching
//     const res = await csrfFetch(`/api/reviews/current?timestamp=${Date.now()}`);
//     if (res.ok) {
//       const data = await res.json();
//       if (Array.isArray(data.Reviews)) {
//         dispatch(loadUserReviews(data.Reviews));
//       } else {
//         console.error('Expected Reviews array, got:', data);
//       }
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching user reviews:', error);
//   }
// };

// // Initial State
// const initialState = {
//   bySpot: {},       // { [spotId]: { [reviewId]: review, ... }, ... }
//   currentUser: {},  // { [reviewId]: review, ... }
//   isLoading: false
// };

// // Helper to normalize an array into { id: item, ... }
// const normalizeData = array => {
//   if (!Array.isArray(array)) return {};
//   return array.reduce((obj, item) => {
//     if (item.id) obj[item.id] = item;
//     return obj;
//   }, {});
// };

// // Reducer
// export default function reviewsReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOAD_REVIEWS: {
//       if (!action.spotId || !action.reviews) return state;
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [action.spotId]: normalizeData(action.reviews)
//         }
//       };
//     }
//     case ADD_REVIEW: {
//       const review = action.review;
//       if (!review || !review.id) return state;
//       const { id, spotId } = review;
//       return {
//         ...state,
//         bySpot: {
//           ...state.bySpot,
//           [spotId]: {
//             ...(state.bySpot[spotId] || {}),
//             [id]: review
//           }
//         },
//         currentUser: {
//           ...state.currentUser,
//           [id]: review
//         }
//       };
//     }
//     case REMOVE_REVIEW: {
//       const { id, spotId } = action;
//       const newState = { ...state };
//       if (spotId && newState.bySpot[spotId]) {
//         newState.bySpot = { ...newState.bySpot };
//         newState.bySpot[spotId] = { ...newState.bySpot[spotId] };
//         delete newState.bySpot[spotId][id];
//       }
//       newState.currentUser = { ...newState.currentUser };
//       delete newState.currentUser[id];
//       return newState;
//     }
//     case LOAD_USER_REVIEWS: {
//       if (!Array.isArray(action.reviews)) return state;
//       return {
//         ...state,
//         currentUser: normalizeData(action.reviews)
//       };
//     }
//     default:
//       return state;
//   }
// }


import { csrfFetch } from './csrf';

// Action Types
const LOAD_REVIEWS        = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW          = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW       = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW       = 'reviews/REMOVE_REVIEW';
const LOAD_USER_REVIEWS   = 'reviews/LOAD_USER_REVIEWS';

// Action Creators
export const loadReviews = (reviews, spotId) => ({
  type: LOAD_REVIEWS,
  reviews,
  spotId
});

export const addReview = review => ({
  type: ADD_REVIEW,
  review
});

export const updateReviewAction = review => ({
  type: UPDATE_REVIEW,
  review
});

export const removeReview = (id, spotId) => ({
  type: REMOVE_REVIEW,
  id,
  spotId
});

export const loadUserReviews = reviews => ({
  type: LOAD_USER_REVIEWS,
  reviews
});

// Thunks
export const fetchReviews = spotId => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadReviews(data.Reviews, spotId));
      return data;
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

export const createReview = (spotId, payload) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const review = await res.json();
      dispatch(addReview(review));
      return review;
    }
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReview = (reviewId, payload) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const updated = await res.json();
      dispatch(updateReviewAction(updated));
      return updated;
    } else {
      const err = await res.json().catch(() => ({ message: 'Update failed' }));
      throw err;
    }
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = (reviewId, spotId = null) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeReview(reviewId, spotId));
    return { success: true };
  } else {
    let err;
    try { err = await res.json(); } catch { err = { message: 'Delete failed' }; }
    throw err;
  }
};

export const fetchUserReviews = () => async dispatch => {
  try {
    // append timestamp to bypass 304 caching
    const res = await csrfFetch(`/api/reviews/current?timestamp=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.Reviews)) {
        dispatch(loadUserReviews(data.Reviews));
      } else {
        console.error('Expected Reviews array, got:', data);
      }
      return data;
    }
  } catch (error) {
    console.error('Error fetching user reviews:', error);
  }
};

// Initial State
const initialState = {
  bySpot: {},       // { [spotId]: { [reviewId]: review, ... }, ... }
  currentUser: {},  // { [reviewId]: review, ... }
  isLoading: false
};

// Helper to normalize an array into { id: item, ... }
const normalizeData = array => {
  if (!Array.isArray(array)) return {};
  return array.reduce((obj, item) => {
    if (item.id) obj[item.id] = item;
    return obj;
  }, {});
};

// Reducer
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      if (!action.spotId || !action.reviews) return state;
      return {
        ...state,
        bySpot: {
          ...state.bySpot,
          [action.spotId]: normalizeData(action.reviews)
        }
      };
    }
    case ADD_REVIEW: {
      const review = action.review;
      if (!review || !review.id) return state;
      const { id, spotId } = review;
      return {
        ...state,
        bySpot: {
          ...state.bySpot,
          [spotId]: {
            ...(state.bySpot[spotId] || {}),
            [id]: review
          }
        },
        currentUser: {
          ...state.currentUser,
          [id]: review
        }
      };
    }
    case UPDATE_REVIEW: {
      const review = action.review;
      if (!review || !review.id) return state;
      const { id, spotId } = review;
      return {
        ...state,
        bySpot: {
          ...state.bySpot,
          [spotId]: {
            ...(state.bySpot[spotId] || {}),
            [id]: review
          }
        },
        currentUser: {
          ...state.currentUser,
          [id]: review
        }
      };
    }
    case REMOVE_REVIEW: {
      const { id, spotId } = action;
      const newState = { ...state };
      if (spotId && newState.bySpot[spotId]) {
        newState.bySpot = { ...newState.bySpot };
        newState.bySpot[spotId] = { ...newState.bySpot[spotId] };
        delete newState.bySpot[spotId][id];
      }
      newState.currentUser = { ...newState.currentUser };
      delete newState.currentUser[id];
      return newState;
    }
    case LOAD_USER_REVIEWS: {
      if (!Array.isArray(action.reviews)) return state;
      return {
        ...state,
        currentUser: normalizeData(action.reviews)
      };
    }
    default:
      return state;
  }
}