<template>
  <div>
    <div class="row justify-center home-page-container">
      <div class="home-page-content">

        <div class="row justify-center">
          <img class="login-img"  src="../assets/sb-logo-primary.png">
        </div>

        <div class="row justify-center">
          <div class="text-h4">Sign up</div>
        </div>


            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md q-mt-lg"
            >
              <q-list class="column items-center">

                <q-item style="width:280px" class="q-mt-sm">
                  <q-input
                  v-model="signupForm.firstname"
                  filled
                  label="Firstname *"
                  type="text"
                  label-color="primary"
                  bg-color="secondary"
                  dense
                  />

                </q-item>

                <q-item style="width:280px" class="q-mt-sm">
                  <q-input
                  v-model="signupForm.lastname"
                  filled
                  label="Lastname *"
                  type="text"
                  label-color="primary"
                  bg-color="secondary"
                  dense
                  />
                </q-item>

                <q-item style="width:280px" class="q-mt-sm">
                  <q-file filled
                          v-model="signupForm.avatarFile"
                          label="Photo"
                          label-color="primary"
                          bg-color="secondary"
                          accept=".jpg, image/*"
                          dense
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </q-item>

                <q-item style="width:280px" class="q-mt-sm">
                  <q-input
                  v-model="signupForm.email"
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
                    v-model="passwordRepetition"
                    filled
                    :type="isPwdRepetition ? 'password' : 'text'"
                    label="Password *"
                    label-color="primary"
                    bg-color="secondary"
                    dense
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwdRepetition ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwdRepetition = !isPwdRepetition"
                      />
                    </template>
                  </q-input>
                </q-item>

                <q-item style="width:280px" class="q-mt-sm">
                  <q-input v-model="signupForm.password"
                           filled
                           :type="isPwd ? 'password' : 'text'"
                           label="Repeat Password *"
                           label-color="primary"
                           bg-color="secondary"
                           dense
                           :rules="[ val => val && val === passwordRepetition || 'Passwords does not match']"
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
                  <q-btn label="Sign up"
                         type="submit"
                         color="secondary"
                         text-color="dark"
                         :disable="signupForm.firstname.length === 0 || signupForm.lastname.length === 0 || signupForm.password.length === 0 || signupForm.email.length === 0 || passwordRepetition.length === 0 || signupForm.password !== passwordRepetition"
                  />
                  <q-btn label="Reset"
                         type="reset"
                         color="primary"
                         text-color="secondary"
                         flat
                         class="q-ml-sm" />

                </q-item>

                <q-item style="width:280px" clickable to="/login" exact v-ripple>
                  <q-item-section>Login</q-item-section>
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
import { SignupUserViewModel } from 'src/app/adapter/primary/views/view-model/user/signup-user.view-model';

@Component
export default class SignupPage extends Vue {

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }

  isPwd = true

  isPwdRepetition = true

  signupForm: SignupUserViewModel = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    avatarFile: null
  };

  passwordRepetition = ''

   onSubmit() {
    this.userStore.signup(this.signupForm)
  }

  onReset() {
    this.signupForm = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      avatarFile: null
    };

    this.passwordRepetition = ''
  }


}
</script>
