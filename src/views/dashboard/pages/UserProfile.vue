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
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
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
  export default {
    data () {
      return {
        corn: '',
        user: '',
        pwd: '',
        token: null,
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USER',
      }),
      onSubmit () {
        const user = this.user
        const pwd = this.pwd
        const data = { email: user, password: pwd }
        console.log(this.corn + '/login/')
        fetch(this.corn + '/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              console.log('Server returned ' + response.status + '   ' + response.statusText)
            }
          })
          .then(response => {
            console.log(response)
            const token = response.token
            const userInfo = {
              user: this.user,
              pwd: this.pwd,
              token: token,
            }
            this.setUserInfo(userInfo)
          })
          .catch(err => {
            console.log(err)
          })
      },
      /* onSubmit () {
        const token = this.login()

      }, */
    },
    mounted () {
      const state = this.$store.state
      this.corn = state.url
      const fromState = state.user
      if (fromState) {
        this.user = fromState.email
        this.pwd = fromState.pwd
        this.token = fromState.token
      }
    },
  }
</script>
