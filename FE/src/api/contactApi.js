import axiosInstance from '../../services/axios';

export const createContact = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${data.token}` },
  };
  return await axiosInstance.patch('/contact/new-Contact', data, config);
};
