<template>
  <div>
    <NavBar />
    <div class="bg-white homeView p-4">
      <div class="row">
        <div class="col-6">
          <h2>Lista wszystkich miast</h2>
          <input
            type="text"
            name="search"
            id="inputSearch"
            class="form-control mb-4 mt-4"
            v-model="query"
            placeholder="Wyszukaj miasto"
            @keyup="search"
          />
          <div v-for="city in cities" :key="city.id">
            <CityListItem :city="city" />
          </div>
        </div>
        <div class="col-6 border-left">
          <h2 class="mb-5">Temperatura i wilgotność obserwowanych miast</h2>
          <h3>Teraz</h3>
          <label>{{ currentTime() }}</label>
          <div v-if="isCityWeatherNull">
            <p>Loading...</p>
          </div>
          <div
            v-else-if="cityWeatherIsList"
            class="d-flex flex-shrink-0 flex-wrap justify-content-between"
          >
            <div
              v-for="cityWeather in cityWeatherList.list"
              :key="cityWeather.id"
              class="d-inline-block m-2 card bg-light"
            >
              <CityWeatherListItem :cityWeather="cityWeather" />
            </div>
          </div>
          <div v-else>
            <div>
              <CityWeatherListItem :cityWeather="cityWeather" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityListItem from "@/components/CityListItem.vue";
import axios from "axios";
import { City } from "../model/City";
import { CityWeather, ListItem } from "../model/CityWeather";
import CityWeatherListItem from "@/components/CityWeatherListItem.vue";
import NavBar from "@/components/NavBar.vue";
import { Measurement } from "../model/Measurement";

@Component({
  components: {
    CityListItem,
    CityWeatherListItem,
    NavBar,
  },
})
export default class HomeView extends Vue {
  public cities: City[] = [];
  public cityWeatherList: CityWeather | null = null;
  public cityWeather: ListItem | null = null;
  public query = "";

  async created() {
    if (!this.$store.state.userName || this.$store.state.userName == "") {
      this.$router.push("signin");
    }

    this.search();
    this.loadData();
  }
  async mounted() {
    window.setInterval(async () => {
      this.loadData();
    }, 60000);
  }

  get cityWeatherIsList(): boolean {
    return this.cityWeatherList != undefined && this.cityWeatherList != null;
  }

  get isCityWeatherNull(): boolean {
    return this.cityWeatherList == null && this.cityWeather == null;
  }

  public async search() {
    var response;

    if (this.query && this.query !== "") {
      response = await axios.get(
        "http://localhost:3000/cities?name_like=" +
          this.query +
          "&_page=1&_limit=20"
      );
    } else {
      response = await axios.get(
        `http://localhost:3000/cities?_page=1&_limit=20`
      );
    }

    this.cities = response.data;
  }

  public async loadData() {
    let storeCities = this.$store.state.userCities;
    let cityIds = this.getCitieIds(storeCities);

    if (cityIds && cityIds !== "") {
      let response, link;
      if (storeCities.length === 1) {
        link =
          "https://api.openweathermap.org/data/2.5/weather?id=" +
          cityIds +
          "&appid=eb91b8f34f88ac5622d694462aa03e24&units=metric&lang=pl";
        response = await axios.get(link);
      } else {
        link =
          "https://api.openweathermap.org/data/2.5/group?id=" +
          cityIds +
          "&appid=eb91b8f34f88ac5622d694462aa03e24&units=metric&lang=pl";
        response = await axios.get(link);
      }

      if (response.data.list) {
        this.cityWeather = null;
        this.cityWeatherList = response.data;

        if (this.cityWeatherList) {
          let dtNow = new Date();

          this.cityWeatherList.list.forEach((element: ListItem) => {
            this.$store.commit("addMeasurementToList", {
              id: this.$store.state.measurementsCounter,
              cityId: element.id,
              time: dtNow,
              temp: element.main.temp,
              humidity: element.main.humidity,
            } as Measurement);
            this.$store.commit("incrementMeasurmentsCounter");
          });
        }
      } else if (response.data) {
        this.cityWeather = response.data;
        this.cityWeatherList = null;

        if (this.cityWeather) {
          let dtNow = new Date();

          this.$store.commit("addMeasurementToList", {
            id: this.$store.state.measurementsCounter,
            cityId: this.cityWeather.id,
            time: dtNow,
            temp: this.cityWeather.main.temp,
            humidity: this.cityWeather.main.humidity,
          } as Measurement);
          this.$store.commit("incrementMeasurmentsCounter");
        }
      } else {
        this.cityWeather = null;
        this.cityWeatherList = null;
      }
    }
  }

  private getCitieIds(cities: City[]): string {
    let ids = "";

    cities.forEach((element: City) => {
      ids += element.id + ",";
    });
    ids = ids.slice(0, -1);

    return ids;
  }

  public currentTime() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    return time;
  }
}
</script>

<style>
.homeView {
  margin: 20vh;
}
</style>
