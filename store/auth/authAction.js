import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const registerUser = createAsyncThunk(
  'user/signup',
  async (
    { name, age, email, mobile, address, adharCardNumber, password, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosConfig.post('/user/signup', {
        name,
        age,
        email,
        mobile,
        address,
        password,
        adharCardNumber,
        role,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.response,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ adharCardNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/login', {
        password,
        adharCardNumber,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.response,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  '/user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/logout');
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data ? error.response.data.error : error.response,
      });
    }
  }
);
