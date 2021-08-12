<template>
  <div></div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { UserStore } from 'src/store/user.store';
import { getModule } from 'vuex-module-decorators';

@Component
export default class ActivateAccountPage extends Vue {

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }


  mounted() {
    const activationToken = this.$router.currentRoute.query.token
    if(activationToken && typeof activationToken === 'string'){
      this.userStore.activateUserAccount(activationToken)
    }
  }


}
</script>
