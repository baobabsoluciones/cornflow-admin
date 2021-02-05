<template>
  <v-container
    id="json-call"
    fluid
    tag="section"
  >
    <base-v-component
      heading="New instance generation"
    />
    <p>Paste a pulp json format for an instance and send it to the server. Alternatively, upload a json file with the format using the below card.</p>
    <send-json
      :default-value="defaultJson"
      :alert="alert"
      :input-schema="pulpJsonSchema"
      @submit-json="submitJson"
      @submit-file="submitForm"
    />
    <div class="py-3" />
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
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
    },
    methods: {
      submitForm (file) {
        if (file === null) {
          console.log('First upload a file!')
          this.alert = { show: true, text: 'You need to add a file first!', type: 'error' }
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
              this.alert = { show: true, text: 'There was an error creating the instance: ' + response.error + '.', type: 'error' }
            } else {
              this.alert = { show: true, text: 'Instance created successfuly.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error creating the instance: ' + '.', type: 'error' }
          })
      },
      submitJson (json) {
        console.log('Sending json to API')
        /* TODO: add name and description fields and map them */
        const data = { data: json, name: 'instance123', description: '' }
        /* const payload = JSON.stringify(data) */
        API.instance.create(data, { 'Content-Type': 'application/json' })
          .then((response) => {
            /* console.log(response) */
            if ('error' in response) {
              this.alert = { show: true, text: 'There was an error creating the instance: ' + response.error + '.', type: 'error' }
            } else {
              this.alert = { show: true, text: 'Instance created successfuly.', type: 'success' }
            }
          })
          .catch((error) => {
            console.log(error)
            this.alert = { show: true, text: 'There was an error creating the instance.', type: 'error' }
          })
      },
    },
  }
</script>
