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
        height="290px"
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
            id="file"
            ref="file"
            type="file"
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
  import VJsoneditor from 'v-jsoneditor/src/index'
  export default {
    name: 'SendJson',
    components: {
      VJsoneditor,
    },
    props: {
      inputSchema: {
        type: Object,
        required: false,
        default: null,
      },
      defaultValue: {
        type: Object,
        required: false,
        default: () => { return { } },
      },
      alert: {
        type: Object,
        default: () => ({ show: false, type: 'success', text: '' }),
      },
    },
    data () {
      return {
        file: null,
        json: this.defaultValue,
        options: {
          mode: 'code',
          modes: ['code', 'text', 'tree'],
          schema: this.inputSchema,
        },
      }
    },
    methods: {
      handleFileUpload () {
        this.file = this.$refs.file.files[0]
      },
      submitFile () {
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
