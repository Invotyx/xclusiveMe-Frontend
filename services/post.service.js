import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function add(saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/post`, data);
}
