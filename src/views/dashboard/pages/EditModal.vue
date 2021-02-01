<template>
  <v-dialog
    v-model="show"
    max-width="450px"
  >
    <base-material-card>
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          {{ title }}
        </div>
      </template>

      <v-form @submit.prevent="onSubmit">
        <v-container class="py-0">
          <v-row
            v-for="(field,i) in fields"
            :key="i"
          >
            <v-col
              md="11"
              class="ma-0 pa-0"
            >
              <v-text-field
                class="purple-input"
                :label="field.label"
                :value="field.value"
                :name="field.name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="red"
                @click.stop="show=false"
              >
                Close
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                type="submit"
                value="Submit"
                color="success"
                class="ml-0"
              >
                Log in
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </base-material-card>
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
  </v-dialog>
</template>

<script>
  export default {
    props: {
      fields: Array,
      title: {
        type: String,
        default: '',
      },
      confirmText: {
        type: String,
        required: false,
        default: 'Confirm',
      },
      value: Boolean,
    },
    data () {
      return {
        snack: {
          show: false,
          text: '',
          color: 'red',
        },
        timeout: 2000,
      }
    },
    computed: {
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        },
      },
    },
    mounted () {
    },
    methods: {
      onSubmit (submitEvent) {
        this.$emit('submit-form', submitEvent.target.elements)
      },
    },
  }
</script>

<style scoped>
.row {
  margin: 0px
}
</style>
