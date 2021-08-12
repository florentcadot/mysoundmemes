<template>
  <div>
    <div class="row justify-center home-page-container">

      <div class="home-page-content">

        <div class="row justify-center">
          <img class="login-img"  src="../assets/sb-logo-primary.png">
        </div>

        <div class="row justify-center">
          <div class="text-h4">Forget password</div>
        </div>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-mt-lg"
        >

          <q-list class="column items-center">

            <q-item style="width:280px">
              <q-input
                v-model="forgetPasswordForm.email"
                filled
                label="Email *"
                type="email"
                label-color="primary"
                bg-color="secondary"
                dense
              />
            </q-item>

            <q-item style="width:280px" class="q-mt-lg">
              <q-btn label="Ok"
                     type="submit"
                     color="secondary"
                     text-color="dark"
                     :disable="forgetPasswordForm.email.length === 0"
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
import { ForgetPasswordUserViewModel } from 'src/app/adapter/primary/views/view-model/user/forget-password-user.view-model';

@Component
export default class ForgetPasswordPage extends Vue {

  mounted(){
    const email  = this.$router.currentRoute.query.email
    if(email && typeof email === 'string'){
      this.forgetPasswordForm.email = email
    }
  }

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }

  forgetPasswordForm: ForgetPasswordUserViewModel = {
    email: '',
  };

  onSubmit() {
    this.userStore.handleForgetPassword(this.forgetPasswordForm)
  }

  onReset() {
    this.forgetPasswordForm = {
      email: ''
    };
  }


}
</script>
