<template>
  <div class="container-fluid">
    <p class="error" v-if="isValid">Błędna nazwa użytkownika lub hasło</p>
    <div
      class="row d-flex justify-content-center align-items-center min-vh-100"
    >
      <div class="col-3 bg-white p-4">
        <h1 class="text-center p-2">Logowanie</h1>
        <div class="d-flex flex-column align-items-start">
          <label for="inputLogin" class="form-label">Login</label>
          <label class="text-danger" v-if="isValid"
            >*Błędna nazwa użytkownika lub hasło
          </label>
          <input
            type="text"
            name="login"
            v-model="login"
            id="inputLogin"
            class="form-control mb-4"
          />
        </div>
        <div class="d-flex flex-column align-items-start">
          <label for="inputPassword" class="form-label">Hasło</label>
          <label class="text-danger" v-if="isValid"
            >*Błędna nazwa użytkownika lub hasło
          </label>
          <input
            type="password"
            name="login"
            v-model="password"
            id="inputPassword"
            class="form-control mb-4"
          />
        </div>
        <input
          class="btn btn-primary btn-lg mb-3 d-block"
          type="button"
          value="Zaloguj"
          @click="signIn"
        />
        <router-link to="/register"
          >Nie masz konta? Zarejestruj się.</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../model/User";

@Component({})
export default class SignInView extends Vue {
  public login = "";
  public password = "";
  public isValid = false;

  async created() {
    let userName = sessionStorage.getItem("userName");
    if (userName && userName !== "") {
      this.$router.push("/");
    }
  }

  public signIn() {
    let usersStr = localStorage.getItem("WheatherAppUsers");

    if (usersStr) {
      let users = JSON.parse(usersStr);

      if (users) {
        let user = this.getUserByLogin(users);

        if (user) {
          this.$store.commit("setUser", user.login);
          this.$store.commit("setCities", user.cities);
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/");
        } else {
          this.isValid = true;
        }
      }
    }
  }

  private getUserByLogin(users: User[]): User | null {
    let user: User | null = null;

    users.forEach((element: User) => {
      if (element.login == this.login && element.password == this.password) {
        user = element;
      }
    });

    return user;
  }
}
</script>

<style>
body {
  background-image: url("../assets/clouds-g381822bd4_1920.jpg");
}
.min-vh-100 {
  min-height: 100vh;
}
</style>
