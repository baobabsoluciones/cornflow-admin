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
          <td>{{ exec.created_at | moment }}</td>
          <td>{{ exec.finished ? "OK" : "NOK" }}</td>
          <td
            class="justify-center layout px-0"
          >
            <v-btn
              icon
              class="mx-0"
              @click="showModal(exec)"
            >
              <v-icon color="teal">
                edit
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

    <test-modal
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
  import API from '../../../api/index'
  import TestModal from '../pages/EditModal'
  export default {
    name: 'ExecutionTable',
    components: {
      TestModal,
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
        exeCols: ['Ref', 'Name', 'Solver', 'Time', 'Created on', 'Status'],
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
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
              // this.snack = { show: true, text: 'There was an error loading executions.', color: 'error' }

            } else {
              this.executions = response.executions
              this.executions.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              // this.snack = { show: true, text: 'Executions loaded.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            // this.snack = { show: true, text: 'There was an error loading executions.', color: 'error' }
          })
      },
      editExecution (payload) {
        console.log(this.execEdit)
        this.execEdit.name = payload.name.value
        this.execEdit.description = payload.description.value
        console.log('Editing execution: ' + this.execEdit.id)
        this.showEditModal = false
        API.execution.put(this.execEdit.id, this.execEdit)
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
    },
  }
</script>
