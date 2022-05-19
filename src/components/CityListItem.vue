<template>
  <div
    class="text-left d-flex p-1 align-items-baseline justify-content-between"
  >
    <label>{{ city.name }}</label>
    <input
      v-if="available"
      type="button"
      value="Obserwuj"
      class="btn btn-primary m-2"
      @click="addToList"
    />
    <input
      v-else
      type="button"
      value="Obserwujesz"
      class="btn btn-outline-primary m-2"
      @click="removeFromList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { City } from "../model/City";

@Component
export default class CityListItem extends Vue {
  @Prop() public city!: City;

  get available(): boolean {
    return !(
      this.$store.state.userCities.length > 0 &&
      this.$store.state.userCities.some((a: City) => a.id == this.city.id)
    );
  }

  public addToList() {
    this.$store.commit("addCitytoList", this.city);
  }

  public removeFromList() {
    this.$store.commit("removeCityFromList", this.city);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
