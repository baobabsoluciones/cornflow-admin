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
              <td>{{ user.admin }}</td>
              <td>{{ user.super_admin }}</td>
              <td
                class="justify-center layout px-0"
              >
                <v-btn
                  icon
                  class="mx-0"
                  @click="editUser(i, user)"
                >
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-0"
                  @click="deleteUser(i, user)"
                >
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <v-alert
      v-model="alert.show"
      dense
      :type="alert.type"
      dismissible
    >
      "{{ alert.text }}"
    </v-alert>
    <div class="py-3" />

  </v-container>
</template>

<script>
  import moment from 'moment'
  import API from '../../../api/index'
  export default {
    name: 'UserTable',
    data () {
      return {
        users: [],
        columnNames: ['ID', 'Email', 'Name', 'Created at', 'admin?', 'superAdmin?'],
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
    },
    mounted () { this.loadData() },
    methods: {
      loadData () {
        API.user.getAll()
          .then(response => {
            if ('error' in response) {
              this.alert = { show: true, text: 'Unable to fetch users:' + response.error, type: 'error' }
            } else {
              this.users = response.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.alert = { show: true, text: 'Users loaded.', type: 'success' }
            }
          })
      },
      deleteUser (i, user) {
        console.log('Deleting user with id: ' + user.id)
        API.user.delete(user.email)
          .then(() => {
            this.users.splice(i, 1)
            this.alert = { show: true, text: 'User ' + user.id + ' was deleted succesfully.', type: 'success' }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error deleting the user ' + user.id + '.', type: 'error' }
          })
      },
      editUser (i, user) {
        console.log('Editing user with id: ' + user.id)
      },
    },
  }
</script>
