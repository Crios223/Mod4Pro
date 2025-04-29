import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null };          // null = visitor

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser:  (state, action) => { state.user = action.payload; },
    clearUser:(state)         => { state.user = null; }
  }
});

export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;