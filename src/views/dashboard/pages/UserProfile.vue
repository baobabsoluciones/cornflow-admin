<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form @submit.prevent="onSubmit">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="user"
                    class="purple-input"
                    label="User Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="pwd"
                    label="Password"
                    class="purple-input"
                    type="password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="name"
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    type="submit"
                    value="Submit"
                    color="success"
                    class="mr-0"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn
            type="submit"
            value="Submit"
            color="success"
            class="mr-0"
            @click="onSignup"
          >
          Signup
          </v-btn>
        </base-material-card>
        <v-alert
          v-model="alert.show"
          dense
          :type="alert.type"
          dismissible
        >
          "{{ alert.text }}"
        </v-alert>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import API from '../../../api/index'
  export default {
    data () {
      return {
        user: '',
        pwd: '',
        name: '',
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
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
            /* TODO: update once the PR is done */
            /* API.user.getOne(this.user).then(response => {
              this.name = response.name
              this.setUserInfo({ user: response.email, name: response.name })
            }) */
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSignup () {
        API.signup(this.user, this.pwd, this.name)
          .then(response => {
            if ('error' in response) {
              console.log(response.error)
              return
            }
            localStorage.setItem('token', response.token)
            const userInfo = {
              user: this.user,
              name: this.name,
            }
            this.setUserInfo(userInfo)
            if (response !== null) {
              this.alert = { show: true, text: 'Your login was successful!', type: 'success' }
            }
          })
          .catch(err => {
            console.log(err)
            console.log(err)
            this.alert = { show: true, text: 'There was an error and your login was unsuccessful.', type: 'error' }
          })
      },
    },
  }
</script>
