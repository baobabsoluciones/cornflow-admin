<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Users"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Users"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th
              v-for="col in columnNames"
              :key="col"
              class="primary--text"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(user,i) in users"
          >
            <tr
              :key="i"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.created_at | moment }}</td>
              <td>
                <v-switch
                  v-model="user.admin"
                  :value="user.admin"
                  @click="editAdmin(user)"
                  false-value="null"
                />
              </td>
              <td>
                <v-switch
                  v-model="user.super_admin"
                  :value="user.super_admin"
                  disabled
                />
              </td>
              <td>
                <v-btn
                  icon
                  class="mx-0"
                  @click="showModal(user)"
                >
                  <v-icon
                    color="teal"
                  >
                    edit
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="deleteUser(i, user)"
                >
                  <v-icon
                    color="pink"
                  >
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <div class="py-3" />

    <test-modal
      v-model="showEditModal"
      :fields="modalTextList"
      :title="modalTitle"
      :buttonText="modalButtonText"
      @submit-form="modalFunction"
    />

    <v-snackbar
      v-model="snack.show"
      :timeout="timeout"
    >
      {{ snack.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snack.color"
          text
          v-bind="attrs"
          @click="snack.show=false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import TestModal from '../pages/EditModal'
  import API from '../../../api/index'
  export default {
    name: 'UserTable',
    components: {
      TestModal,
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        users: [],
        columnNames: ['ID', 'Email', 'Name', 'Created at', 'Admin', 'SuperAdmin'],
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        modalTextList: [],
        timeout: 2000,
        showEditModal: false,
        modalFunction: '',
        modalTitle: '',
        modalButtonText: '',
        userEdit: '',
      }
    },
    mounted () { this.loadData() },
    methods: {
      showModal (us) {
        this.modalTextList = [
          { name: 'name', label: 'Name', value: us.name },
          { name: 'email', label: 'E-mail', value: us.email },
        ]
        this.modalFunction = this.editUser
        this.modalTitle = 'Change user information'
        this.modalButtonText = 'Save'
        this.showEditModal = true
        this.userEdit = us
      },
      loadData () {
        API.user.getAll()
          .then(response => {
            if ('error' in response) {
              this.alert = { show: true, text: 'Unable to fetch users:' + response.error, type: 'error' }
            } else {
              this.users = response.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.snack = { show: true, text: 'Users loaded.', color: 'success' }
            }
          })
      },
      deleteUser (i, user) {
        console.log('Deleting user with id: ' + user.id)
        API.user.delete(user.id)
          .then((response) => {
            if ('error' in response) {
              console.log(response)
            } else {
              this.users.splice(i, 1)
              this.snack = { show: true, text: 'User ' + user.id + ' was deleted succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error deleting the user ' + user.id + '.', color: 'error' }
          })
      },
      editUser (payload) {
        console.log('Editing user with id: ' + this.userEdit.id)
        console.log(payload)
        this.userEdit.name = payload.name.value
        this.userEdit.email = payload.email.value
        // meter correo, nombre y revisar qué más
        // quitar admin y hacerlo con switch
        // mostrar de otra manera el superadmin
        this.showEditModal = false
        console.log(this.userEdit)
        API.user.put(
          this.userEdit.id,
          { name: this.userEdit.name, email: this.userEdit.email },
          { 'Content-Type': 'application/json' },
        )
          .then((response) => {
            if ('error' in response) {
              console.log(response.error)
              this.snack = { show: true, text: 'There was an error editing the user: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'User ' + this.userEdit.id + ' was edited succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error editing the user ' + this.userEdit.id + '.', color: 'error' }
          })
      },
      editAdmin (user) {
        this.userEdit = user
        console.log('Editing user admin with id: ' + this.userEdit.id)
        if (user.admin !== true) {
          this.userEdit.admin = false
        } else {
          this.userEdit.admin = true
        }
        console.log(Number(this.userEdit.admin))
        API.user.putAdmin(
          this.userEdit.id, { admin: this.userEdit.admin }, Number(this.userEdit.admin),
          { 'Content-Type': 'application/json' },
        )
          .then((response) => {
            console.log(response)
            if ('error' in response) {
              console.log(response.error)
              this.snack = { show: true, text: 'There was an error editing the user: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'User ' + this.userEdit.id + ' was edited succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error editing the user ' + this.userEdit.id + '.', color: 'error' }
          })
      },
    },
  }
</script>

<style>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: white;
    color: white;
}
</style>
