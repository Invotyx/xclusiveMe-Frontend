import apiClient from './axiosInterceptor';

export async function getCountries() {
  return apiClient.get(
    `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes;flag`
  );
}
