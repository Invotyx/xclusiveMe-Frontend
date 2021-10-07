import axios from "axios";
import countries from "../countries.json";

export async function getCountries() {
  console.log("COUNTRIES", countries);
  return countries;
}
