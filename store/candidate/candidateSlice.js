import { createSlice } from '@reduxjs/toolkit';
import { vote } from './candidateAction';
// Adjust the import path as needed

const initialState = {
  loading: false,
  error: null,
  voteStatus: null, // To store vote status or response message
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(vote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.voteStatus = null;
      })
      .addCase(vote.fulfilled, (state, action) => {
        state.loading = false;
        state.voteStatus = action.payload.message; // Assuming the response includes a message
      })
      .addCase(vote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.voteStatus = null;
      });
  },
});

export default candidateSlice.reducer;
