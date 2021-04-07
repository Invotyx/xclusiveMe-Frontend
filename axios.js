import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const headers = localStorage.getItem('jwtToken')
  ? { Authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
  : null;
const instance = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
  headers,
});

export default instance;
