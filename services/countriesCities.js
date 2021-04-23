import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getCountries() {
  return apiClient.get(`${SERVER_ADDRESS}/country`);
}

export async function getPlanActivatedCountries() {
  return apiClient.get(`${SERVER_ADDRESS}/products/plan/countries`);
}

export async function getCities(countryId) {
  return apiClient.get(
    `${SERVER_ADDRESS}/country/${countryId}/city?page=1&limit=100&city=`
  );
}
