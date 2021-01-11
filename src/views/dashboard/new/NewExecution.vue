<template>
  <v-container
    id="json-call"
    fluid
    tag="section"
  >
    <v-btn
      type="submit"
      value="Submit"
      color="success"
      class="mr-0"
      @click="loadData"
    >
      Fill list
    </v-btn>
    <p>Choose an instance to solve from the dropdown list:</p>
    <v-autocomplete
      v-model="value"
      :items="items"
      item-text="name"
      item-value="value"
    />
    <base-v-component
      heading="Start an execution"
    />
    <p>Paste a pulp json format for a solver configuration and send it to the server. Alternatively, upload a json file with the format using the below card.</p>
    <send-json
      :default-value="{ solver: 'PULP_CBC_CMD', timeLimit: 10 }"
      :submitted="submitted"
      :error="error"
      @submit-json="submitJson"
      @submit-file="submitForm"
    />
    <div class="py-3" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { newExecution, getInstance } from '@/api'
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
        submitted: false,
        error: false,
      }
    },
    computed: {
      ...mapState(['url', 'user']),
    },
    mounted () { this.loadData() },
    methods: {
      submitForm (file) {
        /* TODO: parse file into json */
        /* newExecution(this.url, this.user.token, json) */
      },
      submitJson (json) {
        console.log('Sending json to API for instance ' + this.value)
        newExecution(this.url, this.user.token, json, this.value)
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
      loadData () {
        getInstance(this.url, this.user.token)
          .then(response => {
            if (response !== null) {
              this.items = response.map(function (element) {
                return {
                  name: element.name + ' @ ' + element.created_at,
                  value: element.id,
                }
              })
            }
          })
      },
    },
  }
</script>
