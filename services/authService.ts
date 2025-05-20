// authService.ts

import axios from 'axios';
import api from '../api/api'; // or use axios directly

export const loginWithMobile = async (payload: any) => {
  try {
    const response = await api.post('/v1/sendloginotp', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (payload: any) => {
  try {
    const response = await api.post('/v1/verifyotp', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (payload: any) => {
  try {
    const response = await axios.post('http://172.26.3.58:5005/thirdparty/RegisterNewPatient/', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
