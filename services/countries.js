import apiClient from './axiosInterceptor';

export async function getCountries() {
  return apiClient.get(
    `https://restcountries.eu/rest/v2/all?fields=name;callingCodes`
  );
}
