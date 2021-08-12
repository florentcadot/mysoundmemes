<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >

    <q-list class="column items-center">

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
        <q-input
          filled
          v-model="form.color"
          label-color="primary"
          bg-color="secondary"
          dense
        >
          <template v-slot:append>
            <q-icon name="colorize"
                    class="cursor-pointer">
              <q-popup-proxy transition-show="scale"
                             transition-hide="scale">
                <q-color v-model="form.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item>

      <q-item style="width:280px"
              class="q-mt-sm">
        <q-file filled
                v-model="form.avatar"
                label="Image"
                label-color="primary"
                bg-color="secondary"
                accept=".jpg, image/*"
                dense
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-item>

      <q-item style="width:280px"
              class="q-mt-lg">
        <q-btn label="Update"
               type="submit"
               color="secondary"
               text-color="dark"
        />
      </q-item>
    </q-list>

  </q-form>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Board } from 'src/app/core/domain/board/board'
import { UpdateBoardViewModel }
  from 'src/app/adapter/primary/views/view-model/board/update-board.view-model'

@Component({
  name: 'update-board-form',
})
export default class UpdateBoardFormComponent extends Vue {
  @Prop({ required: true, type: Object }) readonly boardToUpdate: Board | undefined

  mounted () {
    if (this.boardToUpdate?.id) {
      this.form = {
        id: this.boardToUpdate.id,
        color: this.boardToUpdate.color,
        title: this.boardToUpdate.title,
      }
    }
  }

  form: UpdateBoardViewModel = {
    id: '',
    title: '',
    color: '',
    avatar: null,
  }

  onSubmit () {
    this.$emit('submitForm', this.form)
  }
}
</script>
