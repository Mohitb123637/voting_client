import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const vote = createAsyncThunk(
  'candidate/vote',
  async ({ candidateID }, { rejectWithValue }) => {
    console.log(`${candidateID}`, 'jijjiji');
    try {
      const response = await axiosConfig.put(`candidate/vote/${candidateID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.message,
      });
    }
  }
);
export const deleteCandidate = createAsyncThunk(
  'candidate/delete',
  async ({ candidateID }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.delete(`candidate/${candidateID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.message,
      });
    }
  }
);
