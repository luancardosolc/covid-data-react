import LocationData from "./LocationData";

export default interface LocationList {
  [locationAbbreviation: string]: LocationData,
}
