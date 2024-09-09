import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const createCandidate = createAsyncThunk(
  'candidate',
  async ({ name, party, age, profileImage }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/candidate', {
        name,
        party,
        age,
        profileImage,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.response,
      });
    }
  }
);
