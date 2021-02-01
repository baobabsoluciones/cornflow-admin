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
            @click="editExecution(e, exec, instanceId)"
            >
                <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn
            icon
            class="mx-0"
            @click="deleteExecution(e, exec, instanceId)"
            >
                <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  <v-alert
    v-model="alert.show"
    dense
    :type="alert.type"
    dismissible
  >
    "{{ alert.text }}"
  </v-alert>
  </div>

</template>

<script>
  import moment from 'moment'
  import API from '../../../api/index'
  export default {
    name: 'ExecutionTable',
    props: {
      instanceId: {
        type: String,
      },
    },
    data () {
      return {
        exeCols: ['Ref', 'Solver', 'Time', 'Created on', 'Status'],
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
        executions: [],
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow()
      },
    },
    mounted () { this.loadData(this.instanceId) },
    methods: {
      loadData (instanceId) {
        API.instance.getOne(instanceId)
          .then((response) => {
            if ('error' in response) {
              this.alert = { show: true, text: 'There was an error loading executions.', type: 'error' }
            } else {
              this.executions = response.executions
              this.executions.sort((a, b) => (a.modified_at < b.modified_at) ? 1 : -1)
              this.alert = { show: true, text: 'Executions loaded.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error loading executions.', type: 'error' }
          })
      },
      editExecution (i, exec, instanceId) {
        console.log('Editing execution: ' + exec.id)
      },
      deleteExecution (i, exec, instanceId) {
        console.log('Deleting execution: ' + exec.id)
        API.execution.delete(exec.id)
          .then((response) => {
            if ('error' in response) {
              this.alert = { show: true, text: 'There was an error deleting the execution ' + exec.id + ': ' + response.error, type: 'error' }
            } else {
              this.executions.splice(i, 1)
              this.alert = { show: true, text: 'Execution ' + exec.id + ' was deleted succesfully.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error deleting the execution ' + exec.id + ':' + error, type: 'error' }
          })
      },
    },
  }
</script>
