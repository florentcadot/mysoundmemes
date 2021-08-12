<template>
  <div>
    <div class="row justify-center home-page-container">

      <div class="home-page-content">

        <div class="row justify-center">
          <img class="login-img"  src="../assets/sb-logo-primary.png">
        </div>

        <div class="row justify-center">
          <div class="text-h4">Login</div>
        </div>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-mt-lg"
        >

          <q-list class="column items-center">

            <q-item style="width:280px">
              <q-input
              v-model="loginForm.email"
              filled
              label="Email *"
              type="email"
              label-color="primary"
              bg-color="secondary"
              dense
              />
            </q-item>

            <q-item style="width:280px" class="q-mt-sm">
              <q-input
                v-model="loginForm.password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Password *"
                label-color="primary"
                bg-color="secondary"
                dense
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-item>

            <q-item style="width:280px" class="q-mt-lg">
                <q-btn label="Login"
                       type="submit"
                       color="secondary"
                       text-color="dark"
                       :disable="loginForm.password.length === 0 || loginForm.email.length === 0 "
                />
                <q-btn label="Reset"
                       type="reset"
                       color="primary"
                       text-color="secondary"
                       flat
                       class="q-ml-sm" />
            </q-item>

            <q-item style="width:280px" clickable exact v-ripple @click="toForgetPassword">
              <q-item-section>Forget password ?</q-item-section>
            </q-item>

            <q-item style="width:280px" clickable to="/signup" exact v-ripple>
              <q-item-section>Sign up</q-item-section>
            </q-item>

          </q-list>

        </q-form>

      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { UserStore } from 'src/store/user.store';
import { getModule } from 'vuex-module-decorators';
import { LoginUserViewModel } from 'src/app/adapter/primary/views/view-model/user/login-user.view-model';

@Component
export default class LoginPage extends Vue {

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }

  isPwd = true;

  loginForm: LoginUserViewModel = {
    email: '',
    password: ''
  };


  onSubmit() {
    this.userStore.login(this.loginForm)
  }


  onReset() {
    this.loginForm = {
      email: '',
      password: ''
    };
  }

  toForgetPassword() {
    this.$router.push({ path: '/forget-password', query: { email: this.loginForm.email } })
  }


}
</script>
