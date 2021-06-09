import axios from 'axios';

export async function getCountries() {
  return axios.get(
    `https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes;flag`
  );
}
