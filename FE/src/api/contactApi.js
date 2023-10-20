import axiosInstance from '../../services/axios';

export const createContact = async ({ accessToken, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.post('/contact/new-Contact', data, config);
};

export const getAllContact = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${data}` },
  };
  return await axiosInstance.get('/contact/allContact', config);
};
