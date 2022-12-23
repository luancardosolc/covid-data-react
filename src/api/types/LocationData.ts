import DailyLocationData from "./DailyLocationData";

export default interface LocationData {
  abbreviation?: string;
  aged_65_older: number,
  aged_70_older: number,
  continent: string,
  data: Array<DailyLocationData>,
  diabetes_prevalence: number,
  gdp_per_capita: number,
  life_expectancy: number,
  location: string,
  median_age: number,
  population: number,
  population_density: number,
}
