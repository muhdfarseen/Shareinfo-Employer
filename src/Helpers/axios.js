import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dev.shareinfo.io/employer',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
