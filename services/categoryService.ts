// authService.ts

import api from '../api/api'; // or use axios directly

export const getCategories = async () => {
  try {
    const response = await api.get('https://productioncms.rainbowhospitals.in/api/v1/getAllCoes');
    return response.data;
  } catch (error) {
    throw error;
  }
  // http://172.26.3.58:5018/thirdparty/GetDoctor/

};

export const getDoctor = async () => {
  try {
    const response = await api.get('http://172.26.3.58:5018/thirdparty/GetDoctor/');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getDoctorbyName = async (body: any) => {
  try {
    const response = await api.post('http://172.26.3.58:5018/thirdparty/SearchDoctorsByName/', body );
    return response.data;
  } catch (error) {
    throw error;
  }
}