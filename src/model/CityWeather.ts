import { Coord } from "./City";

export interface CityWeather {
  cnt: number;
  list: ListItem[];
}

export interface ListItem {
  id: number;
  name: string;
  clouds: Clouds;
  coord: Coord;
  dt: number;
  main: Main;
  sys: Sys;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Sys {
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}
