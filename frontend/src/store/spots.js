import { csrfFetch } from './csrf';


const LOAD_SPOTS      = 'spots/LOAD_SPOTS';
const LOAD_SPOT       = 'spots/LOAD_SPOT';
const CREATE_SPOT     = 'spots/CREATE_SPOT';
const UPDATE_SPOT     = 'spots/UPDATE_SPOT';
const DELETE_SPOT     = 'spots/DELETE_SPOT';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';


const loadSpots     = spots => ({ type: LOAD_SPOTS, spots });
const loadSpot      = spot  => ({ type: LOAD_SPOT,  spot });
const addSpot       = spot  => ({ type: CREATE_SPOT, spot });
const editSpot      = spot  => ({ type: UPDATE_SPOT, spot });
const removeSpot    = id    => ({ type: DELETE_SPOT, id   });
const loadUserSpots = spots => ({ type: LOAD_USER_SPOTS, spots });


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

  
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData)
  });
  if (!res.ok) throw res;
  const spot = await res.json();

  
  const imageUrls = [previewImage, ...extraImages].filter(Boolean);
  await postSpotImages(spot.id, imageUrls);

  
  const fullRes = await csrfFetch(`/api/spots/${spot.id}`);
  if (!fullRes.ok) throw fullRes;
  const fullSpot = await fullRes.json();

  
  dispatch(addSpot(fullSpot));

  return fullSpot;
};

export const updateSpot = (id, payload) => async dispatch => {
  const { previewImage, extraImages = [], ...spotData } = payload;

  
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(spotData)
  });
  if (!res.ok) throw res;
  const spot = await res.json();
  dispatch(editSpot(spot));

  
  const imageUrls = [previewImage, ...extraImages].filter(Boolean);
  await postSpotImages(id, imageUrls);

  return spot;
};

export const deleteSpot = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
  if (res.ok) dispatch(removeSpot(id)); else throw res;
};


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