import { csrfFetch } from './csrf';


const LOAD_REVIEWS        = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW          = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW       = 'reviews/UPDATE_REVIEW';
const REMOVE_REVIEW       = 'reviews/REMOVE_REVIEW';
const LOAD_USER_REVIEWS   = 'reviews/LOAD_USER_REVIEWS';


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


const initialState = {
  bySpot: {},       
  currentUser: {},  
  isLoading: false
};


const normalizeData = array => {
  if (!Array.isArray(array)) return {};
  return array.reduce((obj, item) => {
    if (item.id) obj[item.id] = item;
    return obj;
  }, {});
};


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