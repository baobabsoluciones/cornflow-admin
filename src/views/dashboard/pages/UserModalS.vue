<template>
  <v-dialog
    v-model="show"
    max-width="450px"
  >
    <base-material-card>
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Create your profile!
        </div>
      </template>

      <v-form @submit.prevent="onSubmit">
        <v-container class="py-0">
          <v-row>
            <v-col
              md="11"
              class="ma-0 pa-0"
            >
              <v-text-field
                v-model="user"
                class="purple-input"
                label="User Name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="11"
              class="ma-0 pa-0"
            >
              <v-text-field
                v-model="pwd"
                label="Password"
                class="purple-input"
                type="password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="11"
              class="ma-0 pa-0"
            >
              <v-text-field
                v-model="name"
                label="First Name"
                class="purple-input"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
            class="mr-0"
            @click="onSignup"
          >
            Signup
          </v-btn>
        </v-col>
      </v-row>
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
  import { mapMutations } from 'vuex'
  import API from '../../../api/index'

  export default {
    props: {
      value: Boolean,
    },
    data () {
      return {
        user: '',
        pwd: '',
        name: '',
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
      const state = this.$store.state
      const fromState = state.user
      if (fromState) {
        this.user = fromState.email
        this.name = fromState.name
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USER',
      }),
      onSubmit () {
        API.signin(this.user, this.pwd)
          .then(response => {
            localStorage.setItem('token', response.token)
            API.user.getOne(this.user).then(response => {
              this.name = response.name
              this.setUserInfo({ user: response.email, name: response.name })
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSignup () {
        API.signup(this.user, this.pwd, this.name)
          .then(response => {
            if ('error' in response | (response.status !== 200 & response.status !== 201)) {
              if ('error' in response) {
                console.log(response.error)
              }
              this.snack = { show: true, text: 'There was an error and your sign up was unsuccessful.', color: 'red' }
              return
            }
            localStorage.setItem('token', response.token)
            const userInfo = {
              user: this.user,
              name: this.name,
            }
            this.setUserInfo(userInfo)
            if (response !== null) {
              this.snack = { show: true, text: 'Your signup was successful!', color: 'success' }
              setTimeout(() => { this.show = false }, this.timeout)
            }
          })
          .catch(err => {
            console.log(err)
            this.snack = { show: true, text: 'There was an error and your signup was unsuccessful.', color: 'red' }
          })
      },
    },
  }
</script>

<style scoped>
.row {
  margin: 0px
}
</style>
