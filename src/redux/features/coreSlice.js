import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDj: null,
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setCurrentDj: (state, action) => {
      console.log('action.payload', action.payload);
      state.currentDj = action.payload;
    },
  },
});

export const { setCurrentDj } = coreSlice.actions;
export default coreSlice.reducer;
