import { City } from "./City";

export interface User {
  login: string;
  password: string;
  cities: City[];
}
