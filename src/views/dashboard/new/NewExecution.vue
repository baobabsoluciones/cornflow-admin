<template>
  <v-container
    id="json-call"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Start an execution"
    />
    <p>
      Choose an instance to solve. Then, choose a name and a description for your new execution.
      Lastly, paste a pulp json format for a solver configuration and send it to the server.
      Alternatively, upload a json file with the format using the below card.
    </p>
    <v-autocomplete
      v-model="value"
      :items="items"
      item-text="name"
      item-value="value"
      filled
      outlined
      label="Choose an instance to solve from the list"
    />
    <v-text-field
      v-model="name"
      label="Name"
    />
    <v-text-field
      v-model="description"
      label="Description"
    />
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
        name: '',
        description: '',
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
        if (!this.name) {
          this.snack = { show: true, text: 'Introduce a name for your new execution.', color: 'error' }
          return 0
        }
        const data = { config: json, instance_id: this.value, name: this.name, description: this.description }
        API.execution.create(data)
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
