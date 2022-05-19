<template>
  <div class="d-flex flex-column p-5">
    <label class="d-block temperature"
      >{{ cityWeather.main.temp.toFixed(0) }}
      <span class="celsius">&#8451;</span></label
    >
    <label>{{ cityWeather.name }}, {{ cityWeather.sys.country }}</label>
    <label>Wilgotność: {{ cityWeather.main.humidity }}</label>
    <button
      type="button"
      class="btn btn-primary mt-4"
      data-toggle="modal"
      :data-target="'#' + popUpId"
      @click="refreshTable()"
    >
      Pokaż szczegóły
    </button>
    <div
      class="modal fade"
      :id="popUpId"
      tabindex="-1"
      aria-labelledby="wyświetlone szczegóły"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title">
              Tabela temperatury i wilgotności miasta {{ cityWeather.name }} w
              czasie
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Zamknij"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-sm table-striped">
              <thead>
                <tr>
                  <th scope="col">Temperatura</th>
                  <th scope="col">Wilgotność</th>
                  <th scope="col">Czas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in measurements" v-bind:key="m.id">
                  <td>{{ m.temp.toFixed(0) }}</td>
                  <td>{{ m.humidity }}</td>
                  <td>
                    {{
                      addLeadingZeros(m.time.getHours(), 2) +
                      ":" +
                      addLeadingZeros(m.time.getMinutes(), 2) +
                      ":" +
                      addLeadingZeros(m.time.getSeconds(), 2)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ListItem } from "../model/CityWeather";
import { Measurement } from "../model/Measurement";

@Component
export default class CityWeatherListItem extends Vue {
  @Prop() public cityWeather!: ListItem;
  public measurements: Measurement[] = [];
  public popUpId = "";

  public created() {
    this.loadData();
    this.popUpId = "CityWeatherModal" + this.cityWeather.id;
  }

  private loadData() {
    if (this.$store.state.measurements) {
      this.measurements = this.$store.state.measurements.filter(
        (element: Measurement) => element.cityId == this.cityWeather.id
      );
    }
  }

  public addLeadingZeros(num: number, totalLength: number): string {
    return String(num).padStart(totalLength, "0");
  }

  public refreshTable() {
    this.loadData();
  }
}
</script>

<style>
.temperature {
  font-family: serif;
  font-size: 60px;
}
.celsius {
  font-family: serif;
  font-size: 20px;
  position: relative;
  bottom: 30px;
}
</style>
