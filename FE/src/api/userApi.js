import axiosInstance from '../../services/axios';

export const loginUser = async (data) => {
  return await axiosInstance.post('/auth/login', data);
};

export const registerAdmin = async (data) => {
  return await axiosInstance.post('/auth/admin-register', data);
};

export const register = async (data) => {
  return await axiosInstance.post('/auth/register', data);
};

export const changePass = async (data) => {
  return await axiosInstance.patch('/user/changePass', data);
};

export const getUserByToken = async () => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axiosInstance.get('/user/user-token', config);
};
