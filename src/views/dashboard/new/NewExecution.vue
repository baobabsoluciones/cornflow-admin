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
      :alert="alert"
      @submit-json="submitJson"
    />
    <div class="py-3" />
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
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
    },
    mounted () { this.loadData() },
    methods: {
      submitJson (json) {
        console.log('Sending execution json to API for instance ' + this.value)
        /* TODO: add name and description fields and map them */
        if (this.value === null) {
          this.alert = { show: true, text: 'You need to select an instance first!', type: 'error' }
        }
        const data = { config: json, instance_id: this.value, name: 'execution12', description: '' }
        API.execution.create(data, { 'Content-Type': 'application/json' })
          .then((response) => {
            console.log(response)
            if ('error' in response) {
              this.alert = { show: true, text: 'There was an error creating the execution: ' + response.error + '.', type: 'error' }
            } else {
              this.alert = { show: true, text: 'Execution created successfuly.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error creating the execution: ' + error + '.', type: 'error' }
          })
      },
      loadData () {
        API.instance.getAll()
          .then(response => {
            console.log(response)
            if ('error' in response) {
              this.alert = { show: true, text: response.error, type: 'error' }
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
