<template>
  <div>
    <q-layout view="hHh Lpr lff"
              class="shadow-2"
    >
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HomeLayout extends Vue {

}
</script>
