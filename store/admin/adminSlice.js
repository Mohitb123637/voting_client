import { createSlice } from '@reduxjs/toolkit';
import { createCandidate } from './adminAction';

const initialState = {
  createdCandidates: null, // Stores created candidate info
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.createdCandidates = action.payload;
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create candidate';
      });
  },
});

export default candidateSlice.reducer;
