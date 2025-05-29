// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS   = 'spots/LOAD_SPOTS';
// const LOAD_SPOT    = 'spots/LOAD_SPOT';
// const CREATE_SPOT  = 'spots/CREATE_SPOT';
// const UPDATE_SPOT  = 'spots/UPDATE_SPOT';
// const DELETE_SPOT  = 'spots/DELETE_SPOT';

// // action creators
// const loadSpots = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot  = spot  => ({ type: LOAD_SPOT, spot });
// const addSpot   = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot  = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot= id    => ({ type: DELETE_SPOT, id });

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   // payload = { address, city, state, country, name, price, previewImage }
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(addSpot(spot));
//     return spot;
//   }
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(editSpot(spot));
//     return spot;
//   }
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) {
//     dispatch(removeSpot(id));
//   }
// };

// // reducer
// const initialState = { allSpots: {}, singleSpot: {} };

// export default function spotsReducer(state = initialState, action) {
//   let newState = { allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(spot => { newState.allSpots[spot.id] = spot });
//       return newState;
//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;
//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       return newState;
//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;
//     default:
//       return state;
//   }
// }




//?--------This workes for create a spot ------


// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS   = 'spots/LOAD_SPOTS';
// const LOAD_SPOT    = 'spots/LOAD_SPOT';
// const CREATE_SPOT  = 'spots/CREATE_SPOT';
// const UPDATE_SPOT  = 'spots/UPDATE_SPOT';
// const DELETE_SPOT  = 'spots/DELETE_SPOT';

// // action creators
// const loadSpots = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot  = spot  => ({ type: LOAD_SPOT, spot });
// const addSpot   = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot  = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot= id    => ({ type: DELETE_SPOT, id });

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     // backend returns { Spots: [...] }
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(addSpot(spot));
//     return spot;
//   }
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(editSpot(spot));
//     return spot;
//   }
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) {
//     dispatch(removeSpot(id));
//   }
// };

// // reducer
// const initialState = { allSpots: {}, singleSpot: {} };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot }
//   };

//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(spot => {
//         newState.allSpots[spot.id] = spot;
//       });
//       return newState;

//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;

//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       return newState;

//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       if (newState.singleSpot.id === action.id) {
//         newState.singleSpot = {};
//       }
//       return newState;

//     default:
//       return state;
//   }
// }









// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS        = 'spots/LOAD_SPOTS';
// const LOAD_SPOT         = 'spots/LOAD_SPOT';
// const CREATE_SPOT       = 'spots/CREATE_SPOT';
// const UPDATE_SPOT       = 'spots/UPDATE_SPOT';
// const DELETE_SPOT       = 'spots/DELETE_SPOT';
// const LOAD_USER_SPOTS   = 'spots/LOAD_USER_SPOTS';

// // action creators
// const loadSpots      = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot       = spot  => ({ type: LOAD_SPOT,  spot });
// const addSpot        = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot       = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot     = id    => ({ type: DELETE_SPOT, id   });
// const loadUserSpots  = spots => ({ type: LOAD_USER_SPOTS, spots });

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//     return data;
//   }
// };

// export const fetchCurrentSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(addSpot(spot));
//     return spot;
//   } else {
//     throw res;
//   }
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(payload)
//   });
//   if (res.ok) {
//     const spot = await res.json();
//     dispatch(editSpot(spot));
//     return spot;
//   } else {
//     throw res;
//   }
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) {
//     dispatch(removeSpot(id));
//   } else {
//     throw res;
//   }
// };

// // reducer
// const initialState = {
//   allSpots:    {},
//   singleSpot:  {},
//   userSpots:   {}
// };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot },
//     userSpots:  { ...state.userSpots }
//   };

//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(s => { newState.allSpots[s.id] = s });
//       return newState;

//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;

//     case LOAD_USER_SPOTS:
//       newState.userSpots = {};
//       action.spots.forEach(s => { newState.userSpots[s.id] = s });
//       return newState;

//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       // also refresh in userSpots if it belongs to current user
//       newState.userSpots[action.spot.id] = action.spot;
//       return newState;

//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       delete newState.userSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;

//     default:
//       return state;
//   }
// }




// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS        = 'spots/LOAD_SPOTS';
// const LOAD_SPOT         = 'spots/LOAD_SPOT';
// const CREATE_SPOT       = 'spots/CREATE_SPOT';
// const UPDATE_SPOT       = 'spots/UPDATE_SPOT';
// const DELETE_SPOT       = 'spots/DELETE_SPOT';
// const LOAD_USER_SPOTS   = 'spots/LOAD_USER_SPOTS';

// // action creators
// const loadSpots      = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot       = spot  => ({ type: LOAD_SPOT,  spot });
// const addSpot        = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot       = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot     = id    => ({ type: DELETE_SPOT, id   });
// const loadUserSpots  = spots => ({ type: LOAD_USER_SPOTS, spots });

// // helper to post images
// async function postSpotImages(spotId, urls) {
//   await Promise.all(
//     urls.map((url, idx) =>
//       csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         body: JSON.stringify({ url, preview: idx === 0 })
//       })
//     )
//   );
// }

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//     return data;
//   }
// };

// export const fetchCurrentSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   const { extraImages = [], ...spotData } = payload;
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(addSpot(spot));

//   // post images (preview + extras)
//   await postSpotImages(spot.id, [spot.previewImage, ...extraImages]);
//   return spot;
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const { extraImages = [], ...spotData } = payload;
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(editSpot(spot));

//   // post new images
//   await postSpotImages(id, [spot.previewImage, ...extraImages]);
//   return spot;
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) dispatch(removeSpot(id)); else throw res;
// };

// // reducer
// const initialState = {
//   allSpots:   {},
//   singleSpot: {},
//   userSpots:  {}
// };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot },
//     userSpots:  { ...state.userSpots }
//   };
//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(s => newState.allSpots[s.id] = s);
//       return newState;
//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;
//     case LOAD_USER_SPOTS:
//       newState.userSpots = {};
//       action.spots.forEach(s => newState.userSpots[s.id] = s);
//       return newState;
//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       newState.userSpots[action.spot.id] = action.spot;
//       return newState;
//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       delete newState.userSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;
//     default:
//       return state;
//   }
// }






// import { csrfFetch } from './csrf';

// // action types
// const LOAD_SPOTS      = 'spots/LOAD_SPOTS';
// const LOAD_SPOT       = 'spots/LOAD_SPOT';
// const CREATE_SPOT     = 'spots/CREATE_SPOT';
// const UPDATE_SPOT     = 'spots/UPDATE_SPOT';
// const DELETE_SPOT     = 'spots/DELETE_SPOT';
// const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';

// // action creators
// const loadSpots     = spots => ({ type: LOAD_SPOTS, spots });
// const loadSpot      = spot  => ({ type: LOAD_SPOT,  spot });
// const addSpot       = spot  => ({ type: CREATE_SPOT, spot });
// const editSpot      = spot  => ({ type: UPDATE_SPOT, spot });
// const removeSpot    = id    => ({ type: DELETE_SPOT, id   });
// const loadUserSpots = spots => ({ type: LOAD_USER_SPOTS, spots });

// // helper to post images
// async function postSpotImages(spotId, urls) {
//   await Promise.all(
//     urls.map((url, idx) =>
//       csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         body: JSON.stringify({ url, preview: idx === 0 })
//       })
//     )
//   );
// }

// // thunks
// export const fetchSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpots(data.Spots));
//   }
// };

// export const fetchSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`);
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadSpot(data));
//     return data;
//   }
// };

// export const fetchCurrentSpots = () => async dispatch => {
//   const res = await csrfFetch('/api/spots/current');
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(loadUserSpots(data.Spots));
//   }
// };

// export const createSpot = payload => async dispatch => {
//   // extract previewImage + extraImages from payload
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) create spot record
//   const res = await csrfFetch('/api/spots', {
//     method: 'POST',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(addSpot(spot));

//   // 2) post images from payload (first is previewImage)
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(spot.id, imageUrls);

//   return spot;
// };

// export const updateSpot = (id, payload) => async dispatch => {
//   const { previewImage, extraImages = [], ...spotData } = payload;

//   // 1) update spot record
//   const res = await csrfFetch(`/api/spots/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(spotData)
//   });
//   if (!res.ok) throw res;
//   const spot = await res.json();
//   dispatch(editSpot(spot));

//   // 2) post new images from payload
//   const imageUrls = [previewImage, ...extraImages].filter(Boolean);
//   await postSpotImages(id, imageUrls);

//   return spot;
// };

// export const deleteSpot = id => async dispatch => {
//   const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//   if (res.ok) dispatch(removeSpot(id)); else throw res;
// };

// // reducer
// const initialState = {
//   allSpots:   {},
//   singleSpot: {},
//   userSpots:  {}
// };

// export default function spotsReducer(state = initialState, action) {
//   const newState = {
//     allSpots:   { ...state.allSpots },
//     singleSpot: { ...state.singleSpot },
//     userSpots:  { ...state.userSpots }
//   };
//   switch (action.type) {
//     case LOAD_SPOTS:
//       newState.allSpots = {};
//       action.spots.forEach(s => newState.allSpots[s.id] = s);
//       return newState;
//     case LOAD_SPOT:
//       newState.singleSpot = action.spot;
//       return newState;
//     case LOAD_USER_SPOTS:
//       newState.userSpots = {};
//       action.spots.forEach(s => newState.userSpots[s.id] = s);
//       return newState;
//     case CREATE_SPOT:
//     case UPDATE_SPOT:
//       newState.allSpots[action.spot.id] = action.spot;
//       newState.singleSpot = action.spot;
//       newState.userSpots[action.spot.id] = action.spot;
//       return newState;
//     case DELETE_SPOT:
//       delete newState.allSpots[action.id];
//       delete newState.userSpots[action.id];
//       if (newState.singleSpot.id === action.id) newState.singleSpot = {};
//       return newState;
//     default:
//       return state;
//   }
// }





import { csrfFetch } from './csrf';

// action types
const LOAD_SPOTS      = 'spots/LOAD_SPOTS';
const LOAD_SPOT       = 'spots/LOAD_SPOT';
const CREATE_SPOT     = 'spots/CREATE_SPOT';
const UPDATE_SPOT     = 'spots/UPDATE_SPOT';
const DELETE_SPOT     = 'spots/DELETE_SPOT';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';

// action creators
const loadSpots     = spots => ({ type: LOAD_SPOTS, spots });
const loadSpot      = spot  => ({ type: LOAD_SPOT,  spot });
const addSpot       = spot  => ({ type: CREATE_SPOT, spot });
const editSpot      = spot  => ({ type: UPDATE_SPOT, spot });
const removeSpot    = id    => ({ type: DELETE_SPOT, id   });
const loadUserSpots = spots => ({ type: LOAD_USER_SPOTS, spots });

// helper to post images
async function postSpotImages(spotId, urls) {
  await Promise.all(
    urls.map((url, idx) =>
      csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url, preview: idx === 0 })
      })
    )
  );
}

// thunks
export const fetchSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export const fetchSpot = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpot(data));
    return data;
  }
};

export const fetchCurrentSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserSpots(data.Spots));
  }
};

export const createSpot = payload => async dispatch => {
  const { previewImage, extraImages = [], ...spotData } = payload;

  // 1) create spot record
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData)
  });
  if (!res.ok) throw res;
  const spot = await res.json();

  // 2) post images from payload
  const imageUrls = [previewImage, ...extraImages].filter(Boolean);
  await postSpotImages(spot.id, imageUrls);

  // 3) fetch fully-populated spot (with previewImage)
  const fullRes = await csrfFetch(`/api/spots/${spot.id}`);
  if (!fullRes.ok) throw fullRes;
  const fullSpot = await fullRes.json();

  // 4) dispatch the fully-populated spot into Redux
  dispatch(addSpot(fullSpot));

  return fullSpot;
};

export const updateSpot = (id, payload) => async dispatch => {
  const { previewImage, extraImages = [], ...spotData } = payload;

  // 1) update spot record
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(spotData)
  });
  if (!res.ok) throw res;
  const spot = await res.json();
  dispatch(editSpot(spot));

  // 2) post new images from payload
  const imageUrls = [previewImage, ...extraImages].filter(Boolean);
  await postSpotImages(id, imageUrls);

  return spot;
};

export const deleteSpot = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
  if (res.ok) dispatch(removeSpot(id)); else throw res;
};

// reducer
const initialState = {
  allSpots:   {},
  singleSpot: {},
  userSpots:  {}
};

export default function spotsReducer(state = initialState, action) {
  const newState = {
    allSpots:   { ...state.allSpots },
    singleSpot: { ...state.singleSpot },
    userSpots:  { ...state.userSpots }
  };
  switch (action.type) {
    case LOAD_SPOTS:
      newState.allSpots = {};
      action.spots.forEach(s => newState.allSpots[s.id] = s);
      return newState;
    case LOAD_SPOT:
      newState.singleSpot = action.spot;
      return newState;
    case LOAD_USER_SPOTS:
      newState.userSpots = {};
      action.spots.forEach(s => newState.userSpots[s.id] = s);
      return newState;
    case CREATE_SPOT:
    case UPDATE_SPOT:
      newState.allSpots[action.spot.id] = action.spot;
      newState.singleSpot = action.spot;
      newState.userSpots[action.spot.id] = action.spot;
      return newState;
    case DELETE_SPOT:
      delete newState.allSpots[action.id];
      delete newState.userSpots[action.id];
      if (newState.singleSpot.id === action.id) newState.singleSpot = {};
      return newState;
    default:
      return state;
  }
}