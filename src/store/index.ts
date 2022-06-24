import Vue from "vue";
import Vuex from "vuex";
import { User } from "../model/User";
import { City } from "../model/City";
import { Measurement } from "../model/Measurement";

Vue.use(Vuex);

export interface Module1State {
  measurementsCounter: number;
  userName: string;
  userCities: City[];
  measurements: Measurement[];
}

export default new Vuex.Store({
  state: {
    userName: "",
    userCities: [],
    measurements: [],
    measurementsCounter: 1,
  } as Module1State,
  getters: {},
  mutations: {
    setUser(state, userName: string) {
      state.userName = userName;
    },

    setCities(state, cities: City[]) {
      state.userCities = cities;
    },

    incrementMeasurmentsCounter(state) {
      state.measurementsCounter += 1;
    },

    addCitytoList(state, city: City) {
      const usersStr = localStorage.getItem("WheatherAppUsers");

      if (usersStr) {
        const users = JSON.parse(usersStr);

        if (users) {
          users.forEach((element: User) => {
            if (element.login == state.userName) {
              element.cities.push(city);

              state.userCities = element.cities;
              sessionStorage.setItem("user", JSON.stringify(element));
            }
          });
        }

        localStorage.setItem("WheatherAppUsers", JSON.stringify(users));
      }
    },

    removeCityFromList(state, city: City) {
      const usersStr = localStorage.getItem("WheatherAppUsers");

      if (usersStr) {
        const users = JSON.parse(usersStr);

        if (users) {
          users.forEach((element: User) => {
            if (element.login == state.userName) {
              element.cities = element.cities.filter(
                (c: City) => c.id !== city.id
              );

              state.userCities = element.cities;
              sessionStorage.setItem("user", JSON.stringify(element));
            }
          });
        }

        localStorage.setItem("WheatherAppUsers", JSON.stringify(users));
      }
    },

    addMeasurementToList(state, measurements: Measurement) {
      state.measurements.push(measurements);
    },
  },
  actions: {},
  modules: {},
});
