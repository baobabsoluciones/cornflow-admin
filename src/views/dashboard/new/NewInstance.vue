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
      :defaultValue="defaultJson"
      :submitted="submitted"
      :error="error"
      @submit-json="submitJson"
      @submit-file="submitForm"
    />
    <div class="py-3" />
  </v-container>
</template>

<script>
  import defaultJsonData from './default_pulp.json'
  import { mapState } from 'vuex'
  import { newInstanceFile, newInstance } from '@/api'
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
      }
    },
    computed: {
      ...mapState(['url', 'user']),
    },
    methods: {
      submitForm (file) {
        const formData = new FormData()
        /* TODO: check the file has good format */
        formData.append('file', this.file)
        console.log('Sending file to API')
        newInstanceFile(this.url, this.user.token, formData)
      },
      submitJson (json) {
        console.log('Sending json to API')
        newInstance(this.url, this.user.token, json)
          .then((response) => {
            if (response !== null) {
              this.error = false
              this.submitted = true
            }
          })
          .catch((error) => {
            console.log(error)
            this.submitted = false
            this.error = true
          })
      },
    },
  }
</script>
