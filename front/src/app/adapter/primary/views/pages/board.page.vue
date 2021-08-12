<template>
  <div>
    <div class="row justify-center">

      <div class="justify-center">
        <div v-if="boardList.length > 0" class="board-list-content-container">
          <q-list class="q-mt-lg" bordered padding v-for="board in boardList"  :key="board.id">
            <q-item class="board-item" clickable v-ripple>
              <q-item-section top avatar @click="handleNavigation(board)" exact>
                <q-avatar v-if="board.avatar" >
                  <img :src="board.avatar">
                </q-avatar>

                <q-avatar v-else  icon="developer_board"/>
              </q-item-section>

              <q-item-section @click="handleNavigation(board)" exact>
                <q-item-label :style="`color:${board.color}` ">{{board.title}}</q-item-label>
              </q-item-section>

              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="" size="12px" flat dense round icon="delete" @click="handleDeleteBoard(board)"/>
                  <q-btn class="" size="12px" flat dense round icon="edit" @click="handleUpdateBoard(board)"/>
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


    <q-dialog v-model="createBoardDialog">
      <q-card class="dialog-content" >
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Create Board </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <create-board-form-component @submitForm="createBoard"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="updateBoardDialog">
      <q-card class="dialog-content">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Update Board </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <update-board-form-component :boardToUpdate="boardTodUpdate" @submitForm="updateBoard"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteBoardDialog">
      <q-card class="dialog-content">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Delete Board </span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <div>Delete board '{{boardToDeleteTitle}}' ?</div>
        </q-card-section>

        <q-card-actions>
          <q-btn  @click="deleteBoard"
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
      <q-btn color="accent" icon="add" label="Add board" @click="createBoardDialog = !createBoardDialog"/>
    </div>

  </div>

</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { BoardStore } from 'src/store/board.store';
import { Board } from 'src/app/core/domain/board/board';
import { CreateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board.view-model';
import { UpdateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/update-board.view-model';
import CreateBoardFormComponent from 'src/app/adapter/primary/views/components/create-board-form.component.vue';
import UpdateBoardFormComponent  from 'src/app/adapter/primary/views/components/update-board-form.component.vue'

@Component({
  components: { CreateBoardFormComponent, UpdateBoardFormComponent }
})
export default class BoardPage extends Vue {

  get boardStore(): BoardStore {
    return getModule(BoardStore, this.$store);
  }

  get boardList(): Board[] {
    return this.boardStore.boards
  }

  mounted() {
    this.boardStore.getBoards()
  }

  createBoardDialog = false
  deleteBoardDialog = false
  boardToDelete: Board | null = null
  boardToDeleteTitle = ''
  updateBoardDialog = false
  boardTodUpdate: Board | null = null

  handleNavigation(board: Board){
    this.boardStore.selectBoard(board)
    this.$router.push(`/board/${board.id}`)
  }

  handleDeleteBoard(board: Board){
    this.boardToDelete = board
    this.boardToDeleteTitle = board.title
    this.deleteBoardDialog = true
  }

  handleUpdateBoard(board: Board){
    this.boardTodUpdate = board
    this.updateBoardDialog = true
  }


  createBoard(form: CreateBoardViewModel){
    this.boardStore.create(form)
    this.createBoardDialog = false
  }

  updateBoard(form: UpdateBoardViewModel) {
    this.boardStore.update(form)
    this.updateBoardDialog = false
  }

  deleteBoard() {
    if(this.boardToDelete?.id){
      this.boardStore.deleteBoardById(this.boardToDelete.id)
      this.deleteBoardDialog = false
    }
  }

}
</script>
