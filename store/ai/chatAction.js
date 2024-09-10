import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const chatSend = createAsyncThunk(
  'ai/chat',
  async ({ question }, { rejectWithValue }) => {
    try {
      // Sending question in the body for a get request
      console.log(question);
      const response = await axiosConfig.post('/ai', { question });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.error || error.message,
      });
    }
  }
);

export const getChat = createAsyncThunk(
  'ai/chat/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/ai/all');
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.error || error.message,
      });
    }
  }
);
