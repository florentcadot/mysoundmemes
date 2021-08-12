<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/sb-logo-primary.png">
          </q-avatar>
        </q-toolbar-title>


        <q-btn flat round dense >

          <q-avatar v-if="userAvatarUrl">
            <img :src="userAvatarUrl">
          </q-avatar>

          <q-avatar v-else icon="account_circle"></q-avatar>

          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/setting/user-account" exact>
                <q-item-section>Account</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
              v-model="leftDrawerOpen"
              :mini="miniState"
              @mouseover="miniState = false"
              @mouseout="miniState = true"
              show-if-above
              mini-to-overlay
              :width="200"
              :breakpoint="500"
              bordered
    >

              <q-scroll-area class="fit">
                <q-list class="">
                  <q-item clickable to="/board" exact v-ripple>

                    <q-item-section avatar>
                      <q-icon  color="primary" name="developer_board" />
                    </q-item-section>
                    <q-item-section>Boards</q-item-section>
                  </q-item>

                  <q-item clickable to="/setting" exact v-ripple>
                    <q-item-section avatar>
                      <q-icon  color="primary" name="settings" />
                    </q-item-section>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                </q-list>

              </q-scroll-area>
    </q-drawer>

    <div class="app-page-container">
      <div class="breadcrumbs-container">
        <q-breadcrumbs class="breadcrumbs">
        <q-breadcrumbs-el v-if="$router.currentRoute.fullPath.includes('board')"  label="Boards" icon="developer_board" to="/board" />
        <q-breadcrumbs-el v-if="$router.currentRoute.fullPath.includes('board/')" :label="selectedBoardName"/>
        <q-breadcrumbs-el v-if="$router.currentRoute.fullPath.includes('setting')"  label="Settings" icon="settings" to="/setting" />
        <q-breadcrumbs-el v-if="$router.currentRoute.fullPath.includes('setting/user-account')" label="User account"/>
      </q-breadcrumbs>
      </div>
      <div class="router-view-container">
        <router-view />
      </div>
    </div>

  </q-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { UserStore } from 'src/store/user.store';
import { getModule } from 'vuex-module-decorators';
import { BoardStore } from 'src/store/board.store';

@Component
export default class MainLayout extends Vue {
  leftDrawerOpen = false
  miniState = true

  get userStore(): UserStore {
    return getModule(UserStore, this.$store);
  }

  get boardStore(): BoardStore {
    return getModule(BoardStore, this.$store);
  }

  get userAvatarUrl(): string | undefined {
    return this.userStore.user?.avatar
  }

  get selectedBoardName(): string | undefined {
    return this.boardStore.boardSelected?.title
  }

  logout(){
    this.userStore.logout()
    this.$router.push('/login')
  }

}
</script>
