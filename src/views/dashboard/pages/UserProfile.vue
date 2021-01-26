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
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { signin } from '@/api'
  export default {
    data () {
      return {
        corn: '',
        user: '',
        pwd: '',
        alert: {
          text: '',
          show: false,
          type: 'success',
        },
      }
    },
    mounted () {
      const state = this.$store.state
      this.corn = state.url
      const fromState = state.user
      if (fromState) {
        this.user = fromState.email
        this.pwd = fromState.pwd
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USER',
      }),
      onSubmit () {
        const user = this.user
        const pwd = this.pwd
        signin(this.corn, user, pwd)
          .then(response => {
            console.log(response)
            const token = response.token
            const userInfo = {
              user: this.user,
              pwd: this.pwd,
              token: token,
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
