import { createSlice } from '@reduxjs/toolkit';
import { candidates, userProfile } from './profileAuth';

const initialState = {
  profile: null,
  candidates: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.candidates = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      .addCase(candidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(candidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(candidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch candidates';
      });
  },
});

export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
