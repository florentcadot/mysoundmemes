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
          label="Title *"
          type="text"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          label-color="primary"
          bg-color="secondary"
          dense
        />
      </q-item>

      <q-item style="width:280px" class="q-mt-sm">
        <q-input
          label="Color *"
          filled
          v-model="form.color"
          label-color="primary"
          bg-color="secondary"
          dense
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="form.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item>

      <q-item style="width:280px" class="q-mt-sm">
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

      <q-item style="width:280px" class="q-mt-lg">
        <q-btn label="Create"
               type="submit"
               color="secondary"
               text-color="dark"
               :disable="form.title.length === 0 || form.color.length === 0"
        />
      </q-item>

    </q-list>

  </q-form>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { CreateBoardViewModel } from 'src/app/adapter/primary/views/view-model/board/create-board.view-model';

@Component({
  name: 'create-board-form'
})
export default class CreateBoardFormComponent extends Vue {

  form: CreateBoardViewModel = {
    title: '',
    color: '',
    avatar: null
  };

  onSubmit() {
    this.$emit('submitForm', this.form);
  }

}
</script>
