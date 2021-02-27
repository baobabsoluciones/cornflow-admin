<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th
            v-for="col in exeCols"
            :key="col"
            class="primary--text"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(exec,e) in executions"
          :key="e"
        >
          <td>{{ exec.id }}</td>
          <td>{{ exec.name }}</td>
          <td>{{ exec.config.solver }}</td>
          <td>{{ exec.config.timeLimit }}</td>
          <td>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="d-inline-block"
                >
                  {{ exec.created_at | moment }}
                </div>
              </template>
              <span>{{ exec.formatdate }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
              <div
                v-on="on"
                class="d-inline-block"
              >
                <v-icon
                  :color="exec.color"
                >
                  mdi-triangle
                </v-icon>
              </div>
              </template>
              <span>{{ exec.message }}</span>
            </v-tooltip>
          </td>
          <td>
            <v-btn
              icon
              class="mx-0"
              @click="showModal(exec)"
            >
              <v-icon color="teal">
                edit
              </v-icon>
            </v-btn>
            <v-menu
              transition="slide-y-transition"
              closeOnClick
              closeOnContentClick
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  class="ml-2"
                  icon
                  min-width="0"
                  overlap
                  elevation="0"
                  v-on="on"
                >
                  <v-icon color="brown">
                    mdi-download
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItemList"
                  :key="index"
                  @click.stop="downloadExecution(exec, item)"
                >
                  <v-list-item-title>
                    <v-btn
                      block
                      color="white"
                    >
                      {{ item.title }}
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              icon
              class="mx-0"
              @click="refreshExecution(exec, e)"
            >
              <v-icon color="pink">
                refresh
              </v-icon>
            </v-btn>
            <v-btn
              icon
              class="mx-0"
              @click="deleteExecution(e, exec)"
            >
              <v-icon color="pink">
                delete
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <edit-modal
      v-model="showEditModal"
      :fields="modalList"
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
  </div>
</template>

<script>
  import moment from 'moment'
  import download from 'downloadjs'
  import API from '../../../api/index'
  import EditModal from '../pages/EditModal'
  export default {
    name: 'ExecutionTable',
    components: {
      EditModal,
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
    },
    props: {
      instanceId: {
        type: String,
      },
      value: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        exeCols: ['Ref', 'Name', 'Solver', 'Time', 'Created on', 'Status', 'Actions'],
        executions: [],
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        timeout: 2000,
        showEditModal: false,
        modalList: [],
        modalFunction: '',
        modalTitle: '',
        modalButtonText: '',
        execEdit: '',
        menuItemList: [
          { title: 'Solution', url: 'data' }, { title: 'Log', url: 'log' },
        ],
      }
    },
    mounted () { this.loadData(this.instanceId) },
    methods: {
      showModal (exec) {
        this.modalList = [
          { name: 'name', label: 'Name', value: exec.name },
          { name: 'description', label: 'Description', value: exec.description },
        ]
        this.modalFunction = this.editExecution
        this.modalTitle = 'Change execution information'
        this.modalButtonText = 'Save'
        this.showEditModal = true
        this.execEdit = exec
      },
      loadData (instanceId) {
        API.instance.getOne(instanceId)
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error loading executions.', color: 'error' }
            } else {
              this.executions = response.executions
              this.executions.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.executions.forEach((exec) => {
                if (exec.state > 0) {
                  exec.color = 'green'
                } else {
                  exec.color = 'red'
                }
                exec.formatdate = moment(exec.created_at).format('DD-MM-YYYY HH:mm:ss')
              })
              this.snack = { show: true, text: 'Executions loaded.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error loading executions.', color: 'error' }
          })
      },
      refreshExecution (execution, e) {
        console.log('Refreshing execution: ' + execution.id + ' .')
        API.execution.getOneDetail(execution.id, 'status')
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error refreshing the execution ' + execution.id + '.', color: 'error' }
            } else {
              this.executions[e].message = response.message
              this.executions[e].message = response.state
              if (this.executions[e].state > 0) {
                this.executions[e].color = 'green'
              } else {
                this.executions[e].color = 'red'
              }
              this.snack = { show: true, text: 'Execution refreshed successfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error refreshing the execution ' + execution.id + '.', color: 'error' }
          })
      },
      editExecution (payload) {
        this.execEdit.name = payload.name.value
        this.execEdit.description = payload.description.value
        console.log('Editing execution: ' + this.execEdit.id)
        this.showEditModal = false
        API.execution.put(
          this.execEdit.id,
          { name: this.execEdit.name, description: this.execEdit.description },
        )
          .then((response) => {
            console.log(response)
            if ('error' in response) {
              console.log(response.error)
              this.snack = { show: true, text: 'There was an error creating the execution: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'execution ' + this.execEdit.id + ' was edited succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error editing the execution ' + this.execEdit.id + '.', color: 'error' }
          })
      },
      deleteExecution (i, exec) {
        console.log('Deleting execution: ' + exec.id)
        API.execution.delete(exec.id)
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error deleting the execution ' + exec.id + ': ' + response.error, color: 'error' }
            } else {
              this.executions.splice(i, 1)
              this.snack = { show: true, text: 'Execution ' + exec.id + ' was deleted succesfully.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error deleting the execution ' + exec.id + '.' + error, color: 'error' }
          })
      },
      downloadExecution (exec, item) {
        API.execution.getOneDetail(exec.id, item.url)
          .then(response => {
            console.log('Downloading execution (' + item.title + '): ' + exec.id)
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error downloading the execution (' + item.title + '): ' + exec.id, color: 'error' }
              console.log(response.error)
            } else {
              download(JSON.stringify(response.data), item.title + '_' + exec.id + '.json', 'text/json')
              this.snack = { show: true, text: 'Executions loaded.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error downloading the execution (' + item.title + '): ' + exec.id, color: 'error' }
          })
      },
    },
  }
</script>
