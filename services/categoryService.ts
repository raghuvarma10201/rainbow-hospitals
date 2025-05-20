// authService.ts

import api from '../api/api'; // or use axios directly

export const getCategories = async () => {
  try {
    const response = await api.get('/v1/getAllCoes');
    return response.data;
  } catch (error) {
    throw error;
  }
};