<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <q-item style="width:280px"
            class="q-mt-sm">
      <q-input
        v-model="form.title"
        filled
        label="Title"
        type="text"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        label-color="primary"
        bg-color="secondary"
        dense
      />
    </q-item>

    <q-item style="width:280px"
            class="q-mt-sm">
      <q-select outlined
                v-model="form.boardId"
                :options="parsedBoardOptions"
                options-dense
                emit-value
                map-options
                label-color="primary"
                bg-color="secondary"
                dense
      >

        <!--      <template v-slot:prepend>-->
        <!--        <q-icon name="event" />-->
        <!--      </template>-->
      </q-select>
    </q-item>

    <q-item style="width:280px"
            class="q-mt-sm">
      <q-btn label="Update"
             type="submit"
             color="secondary"
             text-color="dark"
      />
    </q-item>
  </q-form>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { UpdateBoardSoundViewModel } from '../view-model/board/update-board-sound.view-model'
import { BoardSound } from 'src/app/core/domain/board/board-sound'
import { Board } from 'src/app/core/domain/board/board'

@Component({
  name: 'update-board-sound-form',
})
export default class UpdateBoardSoundFormComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly soundToUpdate: BoardSound | undefined
  @Prop({ type: Array, default: () => [], required: true }) readonly boardList: Board[] | undefined

  mounted () {
    if (this.soundToUpdate?.id) {
      this.form = {
        id: this.soundToUpdate.id,
        boardId: this.soundToUpdate.boardId,
        title: this.soundToUpdate.title,
      }
    }
    if (this.boardList) {
      this.parsedBoardOptions = this.boardList.map(board => ({
        label: board.title,
        value: board.id,
      }),
      )
    }
  }

  form: UpdateBoardSoundViewModel = {
    id: '',
    boardId: '',
    title: '',
  }


  parsedBoardOptions: {label?: string, value?: string}[] = []

  onSubmit () {
    this.$emit('submitForm', this.form)
  }
}
</script>
