<template>
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
        <td>{{ exec.reference_id }}</td>
        <td>{{ exec.created_at }}</td>
        <td>{{ exec.modified_at }}</td>
        <td>{{ exec.finished }}</td>
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
</template>

<script>
  import { mapState } from 'vuex'
  import { delExecution } from '@/api'
  export default {
    name: 'ExecutionTable',
    props: {
      instanceId: {
        type: Number,
      },
      executions: {
        type: Array,
      },
    },
    data () {
      return {
        exeCols: ['Ref', 'Created on', 'Modified on', 'Finished?'],
      }
    },
    computed: {
      ...mapState(['url', 'user']),
    },
    methods: {
      editExecution (i, exec, instanceId) {
        console.log('Editing execution: ' + exec.reference_id)
      },
      deleteExecution (i, exec, instanceId) {
        console.log('Deleting execution: ' + exec.reference_id)
        delExecution(this.url, this.user.token, exec.reference_id)
          .then(() => {
            this.executions.splice(i, 1)
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  }
</script>
