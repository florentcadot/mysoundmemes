<template>
  <div>
    <div class="row justify-center">
      <div class="justify-center">

        <div v-if="boardSoundList.length > 0" class="board-list-content-container">

          <q-list class="q-mt-lg" bordered padding v-for="sound in boardSoundList"  :key="sound.id">
            <q-item class="board-item" v-ripple>

              <q-item-section avatar>
                {{sound.title}}
              </q-item-section>

              <q-item-section>

                  <audio class="audio-player" controls>
                    <source :src="sound.file" type="audio/mpeg">
                    Your browser does not support the audio tag.
                  </audio>

              </q-item-section>

              <q-item-section  side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="" size="12px" flat dense round icon="delete" @click="handleDeleteSound(sound)"/>
                  <q-btn class="" size="12px" flat dense round icon="edit" @click="handleUpdateSound(sound)"/>
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </div>


        <div v-else>
          <div  class="row items-center" style="height: 300px">
              Empty
          </div>
        </div>

      </div>
    </div>

    <q-dialog v-model="createSoundDialog">
      <q-card class="dialog-content">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Create Sound </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <create-board-sound-form-component :boardId="$router.currentRoute.params.id" @submitForm="createSound"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="updateSoundDialog">
      <q-card class="dialog-content">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Update Sound </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <update-board-sound-form-component :soundToUpdate="soundToUpdate" :boardList="boardList" @submitForm="updateSound"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteSoundDialog">
      <q-card class="dialog-content">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Delete Sound </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <div>Delete sound '{{soundToDeleteTitle}}' ?</div>
        </q-card-section>

        <q-card-actions>
          <q-btn @click="deleteSound"
                 color="secondary"
                 text-color="dark"
          >
            Delete
          </q-btn>
          <q-btn v-close-popup
                 class="q-ml-sm"
                 color="primary"
                 text-color="secondary"
                 flat
          >
            Back
          </q-btn>
        </q-card-actions>

      </q-card>
    </q-dialog>


    <div class="action-button">
      <q-btn v-if="$q.screen.width < 400" color="accent" label="Add" icon="add"  @click="createSoundDialog = !createSoundDialog"/>
      <q-btn v-else color="accent"  label="Add sound" icon="add" @click="createSoundDialog = !createSoundDialog"/>
    </div>

  </div>

</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { BoardStore } from 'src/store/board.store';
import { BoardSound } from 'src/app/core/domain/board/board-sound';
import { UpdateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/update-board.view-model';
import { CreateBoardSoundViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board-sound.view-model';
import CreateBoardSoundFormComponent
  from 'src/app/adapter/primary/views/components/create-board-sound-form.components.vue';
import UpdateBoardSoundFormComponent
  from 'src/app/adapter/primary/views/components/update-board-sound-form.components.vue';
import { Board } from 'src/app/core/domain/board/board';

@Component({
  components: { CreateBoardSoundFormComponent, UpdateBoardSoundFormComponent }
})
export default class BoardDetailPage extends Vue {

  get boardStore(): BoardStore {
    return getModule(BoardStore, this.$store);
  }

  get boardList(): Board[] {
    return this.boardStore.boards
  }

  get boardSoundList(): BoardSound[] {
    return this.boardStore.sounds
  }

  get boardSelected(): Board | undefined {
    return this.boardStore.boardSelected
  }

  mounted() {
    if(!this.boardSelected){
      this.$router.push('/board')
    } else {
      this.boardStore.getSoundList(this.$router.currentRoute.params.id)
    }
  }

  createSoundDialog = false
  deleteSoundDialog = false
  soundToDelete: BoardSound | null = null
  soundToDeleteTitle = ''
  updateSoundDialog = false
  soundToUpdate: BoardSound | null = null

  handleDeleteSound(sound: BoardSound){
    this.soundToDelete = sound
    this.soundToDeleteTitle = sound.title
    this.deleteSoundDialog = true
  }

  handleUpdateSound(sound: BoardSound){
    this.soundToUpdate = sound
    this.updateSoundDialog = true
  }

  createSound(props: CreateBoardSoundViewModel) {
    this.boardStore.createSound(props)
    this.createSoundDialog = false
  }

  updateSound(props: UpdateBoardViewModel) {
    if(this.soundToUpdate){
      this.boardStore.updateSound({ form: props, boardId: this.soundToUpdate.boardId })
    }
    this.updateSoundDialog = false
  }

  deleteSound() {
    if(this.soundToDelete){
      this.boardStore.deleteSoundById(this.soundToDelete)
    }
    this.deleteSoundDialog = false
  }


}
</script>
