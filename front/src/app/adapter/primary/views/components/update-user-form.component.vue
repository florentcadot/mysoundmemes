<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <q-list class="column items-center">

      <q-item style="width:280px" class="q-mt-sm">
        <q-input
          v-model="form.firstname"
          filled
          label="Firstname"
          type="text"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          label-color="primary"
          bg-color="secondary"
          dense
        />
      </q-item>

      <q-item style="width:280px" class="q-mt-sm">
        <q-input
          v-model="form.lastname"
          filled
          label="Lastname"
          type="text"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          label-color="primary"
          bg-color="secondary"
          dense
        />
      </q-item>

      <q-item style="width:280px" class="q-mt-sm">
        <q-input
          v-model="form.email"
          filled
          label="Email"
          type="email"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          label-color="primary"
          bg-color="secondary"
          dense
        />
      </q-item>

<!--      <q-item style="width:280px" class="q-mt-sm">-->
<!--        <q-input v-model="form.oldPassword"-->
<!--                 filled-->
<!--                 :type="isPwd ? 'password' : 'text'"-->
<!--                 label="Current password"-->
<!--                 label-color="primary"-->
<!--                 bg-color="secondary"-->
<!--                 dense-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <q-icon-->
<!--              :name="isPwd ? 'visibility_off' : 'visibility'"-->
<!--              class="cursor-pointer"-->
<!--              @click="isPwd = !isPwd"-->
<!--            />-->
<!--          </template>-->
<!--        </q-input>-->
<!--      </q-item>-->

<!--      <q-item style="width:280px" class="q-mt-sm">-->
<!--        <q-input v-model="form.newPassword"-->
<!--                 filled-->
<!--                 :type="isPwd ? 'password' : 'text'"-->
<!--                 label="New password"-->
<!--                 label-color="primary"-->
<!--                 bg-color="secondary"-->
<!--                 dense-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <q-icon-->
<!--              :name="isPwd ? 'visibility_off' : 'visibility'"-->
<!--              class="cursor-pointer"-->
<!--              @click="isPwd = !isPwd"-->
<!--            />-->
<!--          </template>-->
<!--        </q-input>-->
<!--      </q-item>-->

      <q-item style="width:280px" class="q-mt-sm">
        <q-file filled
                v-model="form.file"
                label="Photo"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { UpdateUserViewModel } from 'src/app/adapter/primary/views/view-model/user/update-user.view-model';
import { User } from 'src/app/core/domain/user/user';

@Component({
  name: 'update-user-form'
})
export default class UpdateUserFormComponent extends Vue {

  @Prop({}) readonly userToUpdate: User | null | undefined

  mounted(){
    this.form = {
      firstname: this.userToUpdate?.firstname,
      lastname: this.userToUpdate?.lastname,
      email: this.userToUpdate?.email,
    }
  }

  form: UpdateUserViewModel = {
    firstname: '',
    lastname: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    file: null
  }

  isPwd = true

  onSubmit() {
    this.$emit('submitForm', this.form);
  }

}
</script>
