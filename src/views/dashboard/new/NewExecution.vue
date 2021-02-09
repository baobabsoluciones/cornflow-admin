<template>
  <v-container
    id="json-call"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Start an execution"
    />
    <v-btn
      type="submit"
      value="Submit"
      color="success"
      class="mr-0"
      @click="loadData"
    >
      Fill list
    </v-btn>
    <p></p>
    <v-autocomplete
      v-model="value"
      :items="items"
      item-text="name"
      item-value="value"
      filled
      outlined
      label="Choose an instance to solve from the list"
    />
    <p>Paste a pulp json format for a solver configuration and send it to the server. Alternatively, upload a json file with the format using the below card.</p>
    <send-json
      :default-value="{ solver: 'PULP_CBC_CMD', timeLimit: 10 }"
      @submit-json="submitJson"
    />
    <div class="py-3" />
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
  import API from '../../../api/index'
  import SendJson from './SendJson'
  export default {
    name: 'NewExecution',
    components: {
      SendJson,
    },
    data () {
      return {
        value: null,
        items: [],
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        timeout: 2000,
      }
    },
    mounted () { this.loadData() },
    methods: {
      submitJson (json) {
        console.log('Sending execution json to API for instance ' + this.value)
        /* TODO: add name and description fields and map them */
        if (!this.value) {
          this.snack = { show: true, text: 'You need to select an instance first!', color: 'error' }
          return
        }
        const data = { config: json, instance_id: this.value, name: 'execution12', description: '' }
        API.execution.create(data, { 'Content-Type': 'application/json' })
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error creating the execution: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'Execution created successfuly.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error creating the execution: ' + error + '.', color: 'error' }
          })
      },
      loadData () {
        API.instance.getAll()
          .then(response => {
            if ('error' in response) {
              this.snack = { show: true, text: response.error, color: 'error' }
              return
            }
            this.items = response.map(function (element) {
              return {
                name: element.name + ' @ ' + element.created_at,
                value: element.id,
              }
            })
          })
      },
    },
  }
</script>
