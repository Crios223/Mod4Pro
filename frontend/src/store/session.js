import { csrfFetch } from "./csrf";


const SET_USER    = "session/setUser";
const REMOVE_USER = "session/removeUser";


const setUser    = (user) => ({ type: SET_USER,    payload: user });
const removeUser = ()      => ({ type: REMOVE_USER });

//?---------------- THUNKS -------------------- ////

//------------------ lOG IN --------------

export const login = ({ credential, password }) => async (dispatch) => {
  const res  = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};


//----------------  SIGN UP -------------------------

export const signup =
  ({ username, email, password, firstName, lastName }) =>
  async (dispatch) => {
    const res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName
      })
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  };



//----------------------------------------------------

//---RESTORE ------

export const restoreUser = () => async (dispatch) => {
  const res  = await csrfFetch("/api/session");
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};


// ------------- LOGOUT ----------------------------


export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};



//----------------------------------------


const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:    return { ...state, user: action.payload };
    case REMOVE_USER: return { ...state, user: null };
    default:          return state;
  }
}