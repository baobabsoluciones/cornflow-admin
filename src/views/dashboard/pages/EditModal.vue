<template>
  <v-dialog
    v-model="show"
    max-width="450px"
  >
    <base-material-card>
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
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
                :type="field.type"
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
                {{ buttonText }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </base-material-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      fields: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
      buttonText: {
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
