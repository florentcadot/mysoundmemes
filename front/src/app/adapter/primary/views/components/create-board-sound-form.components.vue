<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >

    <q-list class="column items-center">

      <q-item style="width:280px" class="q-mt-sm">
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

      <q-item style="width:280px" class="q-mt-sm">
        <q-file filled
                v-model="form.file"
                label="Audio file"
                label-color="primary"
                bg-color="secondary"
                dense
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-item>

      <q-item style="width:280px" class="q-mt-lg">
        <q-btn label="Create"
               type="submit"
               color="secondary"
               text-color="dark"
               :disable="form.title.length === 0 || !form.file"
        />
      </q-item>
    </q-list>

  </q-form>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateBoardSoundViewModel } from '../view-model/board/create-board-sound.view-model';

@Component({
  name: 'create-board-sound-form'
})
export default class CreateBoardSoundFormComponent extends Vue {

  @Prop({ type: String, required: true }) readonly boardId: string | undefined

  mounted() {
    if(this.boardId){
      this.form.boardId = this.boardId
    }
  }

  form: CreateBoardSoundViewModel = {
    boardId: '',
    title: '',
    file: null
  }

  onSubmit(){
    this.$emit('submitForm', this.form )
  }

}
</script>
