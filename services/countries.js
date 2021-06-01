import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getCountries() {
  return apiClient.get(
    `https://restcountries.eu/rest/v2/all?fields=name;callingCodes`
  );
}
