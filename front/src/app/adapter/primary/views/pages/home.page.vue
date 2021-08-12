<template>
  <div>
    <div class="row justify-center home-page-container">

      <div class="home-page-content">
        <div class="row justify-center">
          <img class="home-img" src="../assets/sb-logo-primary.png">
        </div>

        <q-list class="column items-center">
          <q-item style="width:280px" clickable to="/board" exact  v-ripple >
            <q-item-section  avatar>
              <q-icon size="lg" color="secondary" name="developer_board" />
            </q-item-section>
            <q-item-section class="text-h3 col-auto" >Boards</q-item-section>
          </q-item>

<!--          <q-item style="width:280px" clickable to="/soundboard/records" exact v-ripple >-->
<!--            <q-item-section  avatar>-->
<!--              <q-icon size="lg" color="secondary" name="mic" />-->
<!--            </q-item-section>-->
<!--            <q-item-section class="text-h3 col-auto">Record</q-item-section>-->
<!--          </q-item>-->

          <q-item style="width:280px" clickable  to="/setting" exact v-ripple>
            <q-item-section  avatar>
              <q-icon size="lg" color="secondary" name="settings" />
            </q-item-section>
            <q-item-section class="text-h3 col-auto">Settings</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserStore } from 'src/store/user.store';
import { getModule } from 'vuex-module-decorators';

@Component
export default class HomePage extends Vue {

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }
  created(){
    this.userStore.handleRefreshAfterLogin()
  }
}
</script>
