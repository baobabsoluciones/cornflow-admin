<template>
  <div>
    <v-app-bar
      id="app-bar"
      absolute
      app
      color="transparent"
      flat
      height="75"
    >
      <v-btn
        class="mr-3"
        elevation="1"
        fab
        small
        @click="setDrawer(!drawer)"
      >
        <v-icon v-if="value">
          mdi-view-quilt
        </v-icon>

        <v-icon v-else>
          mdi-dots-vertical
        </v-icon>
      </v-btn>

      <v-toolbar-title
        class="hidden-sm-and-down font-weight-light"
        v-text="$route.name"
      />

      <v-spacer />

      <v-text-field
        :label="$t('search')"
        color="secondary"
        hide-details
        style="max-width: 165px;"
      >
        <template
          v-if="$vuetify.breakpoint.mdAndUp"
          v-slot:append-outer
        >
          <v-btn
            class="mt-n2"
            elevation="1"
            fab
            small
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <div class="mx-3" />

      <v-btn
        class="ml-2"
        min-width="0"
        text
        to="/"
      >
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="ml-2"
            min-width="0"
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              color="red"
              overlap
              bordered
            >
              <template v-slot:badge>
                <span>5</span>
              </template>

              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list
          :tile="false"
          nav
        >
          <div>
            <app-bar-item
              v-for="(n, i) in notifications"
              :key="`item-${i}`"
            >
              <v-list-item-title v-text="n" />
            </app-bar-item>
          </div>
        </v-list>
      </v-menu>

      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              class="ml-2"
              min-width="0"
              overlap
              elevation=0
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                Introduce your credentials to log in
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
        </v-dialog>
      </div>

      <v-menu
        close-on-click
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
            <v-btn
              text
              class="ml-2"
              min-width="0"
              overlap
              elevation=0
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
              v-for="(item, index) in menuUserItems"
              :key="index"
            >
              <v-list-item-title>
                  <v-btn
                    block
                    color="white"
                  >
                    {{ item.title }}
                  </v-btn>
              </v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
  </div>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'
  // import UserModal from 'C:/Users/bob_david/Desktop/PROYECTOS/cornflow-admin/src/views/dashboard/pages/UserModal'

  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import { signin } from '@/api'

  export default {
    name: 'DashboardCoreAppBar',
    components: {
      // UserModal,
      AppBarItem: {
        data () {
          return {
            dialog: false,
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
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
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
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      menuUserItems: [
        { title: 'LogIn' },
        { title: 'EditProfile' },
      ],
      dialog: false,
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
