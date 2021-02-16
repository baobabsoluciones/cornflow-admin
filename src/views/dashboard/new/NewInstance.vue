<template>
  <v-container
    id="json-call"
    fluid
    tag="section"
  >
    <base-v-component
      heading="New instance generation"
    />
    <p>Choose a name and a description for your new instance. Then, paste a pulp json format for an instance and send it to the server. Alternatively, upload a json file with the format using the below card.</p>
    <v-text-field
      v-model="name"
      label="Name"
    />
    <v-text-field
      v-model="description"
      label="Description"
    />
    <v-text-field
      v-model="schema"
      label="Schema"
    />
    <send-json
      :default-value="defaultJson"
      :input-schema="pulpJsonSchema"
      @submit-json="submitJson"
      @submit-file="submitForm"
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
  import defaultJsonData from './default_pulp.json'
  import pulpJsonSchema from './pulp_json_schema.json'
  import API from '../../../api/index'
  import SendJson from './SendJson'
  export default {
    name: 'NewInstance',
    components: {
      SendJson,
    },
    data () {
      return {
        defaultJson: defaultJsonData,
        submitted: false,
        error: false,
        pulpJsonSchema: pulpJsonSchema,
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        timeout: 2000,
        name: '',
        description: '',
        schema: '',
      }
    },
    methods: {
      submitForm (file) {
        if (file === null) {
          console.log('First upload a file!')
          this.snack = { show: true, text: 'You need to add a file first!', color: 'error' }
          return
        }
        var formData = new FormData()
        /* TODO: add name and description fields and map them */
        /* TODO: check the file has good format */
        /* console.log(file) */
        formData.append('file', file)
        formData.append('name', 'instance567')
        formData.append('description', '')
        console.log('Sending file to API')
        /* console.log(formData) */
        API.instancefile(formData)
          .then((response) => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error creating the instance: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'Instance created successfuly.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error creating the instance: ' + error + '.', color: 'error' }
          })
      },
      submitJson (json) {
        console.log('Sending json to API')
        /* TODO: add name and description fields and map them */
        if (!this.name) {
          this.snack = { show: true, text: 'Introduce a name for your new instance.', color: 'error' }
          return 0
        }
        const data = { data: json, name: this.name, description: this.description }
        /* const payload = JSON.stringify(data) */
        API.instance.create(data)
          .then((response) => {
            /* console.log(response) */
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error creating the instance: ' + response.error + '.', color: 'error' }
            } else {
              this.snack = { show: true, text: 'Instance created successfuly.', color: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.snack = { show: true, text: 'There was an error creating the instance: ' + error + '.', color: 'error' }
          })
      },
    },
  }
</script>
