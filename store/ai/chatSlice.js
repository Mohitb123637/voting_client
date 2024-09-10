import { createSlice } from '@reduxjs/toolkit';
import { getChat } from './chatAction';
// Adjust the import path as needed

// Example of initial state and reducer setup
const initialState = {
  loading: false,
  error: null,
  data: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default aiSlice.reducer;
