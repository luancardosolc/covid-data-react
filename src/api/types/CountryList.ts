import CountryData from "./CountryData";

export default interface CountryList {
  [countryAbbreviation: string]: CountryData,
}
