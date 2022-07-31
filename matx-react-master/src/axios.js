import axios from 'axios';

axios.defaults.baseURL = 'https://gostbaducking1-menu-backend.herokuapp.com';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;
