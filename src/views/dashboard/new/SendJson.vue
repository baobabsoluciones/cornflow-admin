<template>
  <div>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Paste a json here!"
      class="px-5 py-3"
    >
      <v-jsoneditor
        v-model="json"
        :options="options"
        @error="onError"
      />
      <v-btn
        value="Submit"
        color="success"
        class="mr-0"
        @click="submitJson"
      >
      Send json
      </v-btn>
    </base-material-card>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Upload a file here!"
      class="px-5 py-3"
    >
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input
            type="file"
            id="file"
            ref="file"
            @change="handleFileUpload"
          />
        </label>
        <v-btn
          class="mr-0"
          color="success"
          @click="submitFile"
        >
        Send file
        </v-btn>
      </div>
    </base-material-card>
    <v-alert
      :value="submitted"
      dense
      type="success"
      dismissible
    >
      The json was sent succesfully!
    </v-alert>
    <v-alert
      :value="error"
      dense
      type="error"
      dismissible
    >
      There was an error sending the json.
    </v-alert>
  </div>
</template>

<script>
  import VJsoneditor from 'v-jsoneditor/src/index'
  export default {
    name: 'SendJson',
    components: {
      VJsoneditor,
    },
    props: {
      schema: {
        type: Object,
        required: false,
        default: null,
      },
      defaultValue: {
        type: Object,
        required: false,
        default: () => { return { } },
      },
      submitted: {
        type: Boolean,
        default: false,
      },
      error: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        file: null,
        json: this.defaultValue,
        options: {
          mode: 'code',
          modes: ['code', 'text', 'tree'],
          /* TODO: validation through a schema: "", */
        },
      }
    },
    methods: {
      handleFileUpload () {
        this.file = this.$refs.file.files[0]
      },
      submitFile () {
        if (this.file === null) {
          console.log('First upload a file!')
          return
        }
        this.$emit('submit-file', this.file)
      },
      onError () {
        console.log('error')
      },
      submitJson () {
        console.log('Sending json to API')
        this.$emit('submit-json', this.json)
      },
    },
  }
</script>
