<template>
  <div>
    <div class="row justify-center">
      <div class="justify-center">
        <q-list class="q-mt-lg" bordered padding>
          <q-item class="board-item" clickable v-ripple to="/setting/user-account" exact>
            <q-item-section top avatar >
              <q-avatar icon="account_circle"></q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>User account</q-item-label>
            </q-item-section>

          </q-item>
        </q-list>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {  }
})
export default class SettingPage extends Vue {

}


</script>
