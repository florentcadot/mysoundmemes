<template>
  <div>
    <div class="row justify-center">
      <div class="justify-center">
        <div class="form-container">
          <update-user-form-component :userToUpdate="userStore.user" @submitForm="updateUser"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import UpdateUserFormComponent
  from 'src/app/adapter/primary/views/components/update-user-form.component.vue';
import { getModule } from 'vuex-module-decorators';
import { UserStore } from 'src/store/user.store';
import { UpdateUserViewModel } from 'src/app/adapter/primary/views/view-model/user/update-user.view-model';

@Component({
  components: {  UpdateUserFormComponent}
})
export default class SettingUserAccountPage extends Vue {

  get userStore(): UserStore {
    return getModule(UserStore, this.$store)
  }

  updateUser(props: UpdateUserViewModel){
    this.userStore.updateUserAccount(props)
  }

}


</script>
