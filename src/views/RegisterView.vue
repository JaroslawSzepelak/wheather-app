<template>
  <div class="container-fluid">
    <div
      class="row d-flex justify-content-center align-items-center min-vh-100"
    >
      <div class="col-3 bg-white p-4">
        <h1 class="text-center p-2">Zarejestruj się</h1>
        <div class="d-flex flex-column align-items-start">
          <label for="inputLogin" class="form-label">Nazwa użytkownika:</label>
          <label class="text-danger" v-if="userExist"
            >*Użytkownik o podanej nazwie już istnieje
          </label>
          <label class="text-danger" v-if="isLoginEmpty"
            >*To pole musi być wypełnione
          </label>
          <input
            type="text"
            name="login"
            v-model="login"
            id="inputLogin"
            class="form-control mb-4"
            @keyup="checkLoginEmpty"
          />
        </div>
        <div class="d-flex flex-column align-items-start">
          <label for="inputPassword" class="form-label">Hasło:</label>
          <label class="text-danger" v-if="isPasswordEmpty"
            >*To pole musi być wypełnione
          </label>
          <input
            type="password"
            name="password"
            v-model="password"
            id="inputPassword"
            class="form-control mb-4"
            @keyup="checkPasswordEmpty"
          />
        </div>
        <div class="d-flex flex-column align-items-start">
          <label for="inputRepeat" class="form-label">Powtórz hasło:</label>
          <label class="text-danger" v-if="isRepeatPasswordEmpty"
            >*To pole musi być wypełnione
          </label>
          <label class="text-danger" v-if="!correctRepeatPassword"
            >*Hasła nie są zgodne
          </label>
          <input
            type="password"
            name="repeatPassword"
            v-model="repeatPassword"
            id="inputRepeat"
            class="form-control mb-4"
            @keyup="checkRepeatPasswordEmpty"
          />
        </div>
        <input
          class="btn btn-primary btn-lg mb-3"
          type="button"
          value="Zarejestruj się"
          @click="register"
          :disabled="!isVaild"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../model/User";

@Component({})
export default class RegisterView extends Vue {
  public login = "";
  public password = "";
  public repeatPassword = "";
  public isLoginEmpty = false;
  public isPasswordEmpty = false;
  public isRepeatPasswordEmpty = false;

  get userExist(): boolean {
    let usersStr = localStorage.getItem("WheatherAppUsers");

    if (usersStr) {
      let users = JSON.parse(usersStr);

      if (users && users.some((a: User) => a.login == this.login)) {
        return true;
      }
    }
    return false;
  }

  get isVaild(): boolean {
    return !this.userExist && this.correctRepeatPassword;
  }
  get correctRepeatPassword(): boolean {
    return this.password === this.repeatPassword;
  }

  public register() {
    this.checkLoginEmpty();
    this.checkPasswordEmpty();
    this.checkRepeatPasswordEmpty();
    if (
      this.isVaild &&
      !this.isLoginEmpty &&
      !this.isPasswordEmpty &&
      !this.isRepeatPasswordEmpty
    ) {
      let usersStr = localStorage.getItem("WheatherAppUsers");

      var users;

      if (usersStr) {
        users = JSON.parse(usersStr);
      } else {
        users = [];
      }

      users.push({ login: this.login, password: this.password, cities: [] });

      localStorage.setItem("WheatherAppUsers", JSON.stringify(users));

      this.$router.push("signin");
    }
  }

  public checkLoginEmpty() {
    if (this.login === "") {
      this.isLoginEmpty = true;
    } else {
      this.isLoginEmpty = false;
    }
  }
  public checkPasswordEmpty() {
    if (this.password === "") {
      this.isPasswordEmpty = true;
    } else {
      this.isPasswordEmpty = false;
    }
  }
  public checkRepeatPasswordEmpty() {
    if (this.repeatPassword === "") {
      this.isRepeatPasswordEmpty = true;
    } else {
      this.isRepeatPasswordEmpty = false;
    }
  }
}
</script>
