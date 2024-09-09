import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const userProfile = createAsyncThunk(
  'user/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/user/profile');
      return response.data; // Return the data if successful
    } catch (error) {
      // If there's an error, return the error message
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const candidates = createAsyncThunk(
  'candidate/candidates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/candidate/candidates');
      return response.data; // Return the data if successful
    } catch (error) {
      // If there's an error, return the error message
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);
