<template>
  <div>
    <div class="row justify-center home-page-container">

      <div class="home-page-content">

        <div class="row justify-center">
          <img class="login-img"  src="../assets/sb-logo-primary.png">
        </div>

        <div class="row justify-center">
          <div class="text-h4">Set a new password</div>
        </div>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-mt-lg"
        >

          <q-list class="column items-center">


            <q-item style="width:280px" class="q-mt-sm">
              <q-input
                v-model="resetPasswordForm.password"
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


            <q-item style="width:280px" class="q-mt-sm">
              <q-input v-model="repeatPassword"
                       filled
                       :type="isPwd ? 'password' : 'text'"
                       label="Repeat Password *"
                       label-color="primary"
                       bg-color="secondary"
                       dense
                       :rules="[ val => val && val === resetPasswordForm.password || 'Passwords does not match']"
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
              <q-btn label="Ok"
                     type="submit"
                     color="secondary"
                     text-color="dark"
                     :disable="resetPasswordForm.password.length === 0 || repeatPassword.length === 0 || repeatPassword !== resetPasswordForm.password"
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
import { ResetUserPasswordViewModel } from 'src/app/adapter/primary/views/view-model/user/reset-user-password.view-model';

@Component
export default class ResetPasswordPage extends Vue {

  mounted(){
    const resetPasswordToken = this.$router.currentRoute.query.token
    if(resetPasswordToken && typeof resetPasswordToken === 'string'){
      this.resetPasswordForm.token = resetPasswordToken
    }
  }

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }

  isPwd = true

  repeatPassword = ''

  resetPasswordForm: ResetUserPasswordViewModel = {
    password: '',
    token: ''
  };

  onSubmit() {
    this.userStore.handleResetPassword(this.resetPasswordForm)
  }

  onReset() {
    this.resetPasswordForm.password = ''
    this.repeatPassword = ''
  }


}
</script>
