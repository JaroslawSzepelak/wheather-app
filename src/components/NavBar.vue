<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
    <div
      class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
    ></div>
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#">WeatherApp</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".dual-collapse2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            {{ $store.state.userName }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click="logOut">Wyloguj</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NavBar extends Vue {
  public logOut() {
    this.$store.commit("setUser", "");
    this.$store.commit("setCities", []);
    sessionStorage.removeItem("userName");
    this.$router.push("/signin");
  }
}
</script>
