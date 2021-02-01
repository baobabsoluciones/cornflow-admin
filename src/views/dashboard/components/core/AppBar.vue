<template>
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
          elevation="0"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuUserItems"
          :key="index"
          @click.stop="showModal(item.id)"
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
    <user-modal-s
      v-model="showUserModalS"
    />
    <user-modal-l
      v-model="showUserModalL"
    />
    <test-modal
      v-model="showEditModal"
      :fields="modalList"
      title="Title test"
      @submit-form="loginSubmit"
    />
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'
  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import UserModalS from '../../pages/UserModalS'
  import UserModalL from '../../pages/UserModalL'
  import TestModal from '../../pages/EditModal'
  import API from '../../../../api/index'
  export default {
    name: 'DashboardCoreAppBar',
    components: {
      UserModalS,
      UserModalL,
      TestModal,
      AppBarItem: {
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
      },
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      modalList: [
        { name: 'user', label: 'Username', default: '' },
        { name: 'pwd', label: 'Password', default: '' },
      ],
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      menuUserItems: [
        { title: 'Log In', id: '1' },
        { title: 'Sign Up', id: '2' },
        { title: 'Test', id: '3' },
      ],
      showUserModalS: false,
      showUserModalL: false,
      showEditModal: false,
    }),
    computed: {
      ...mapState(['drawer']),
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
        setUserInfo: 'SET_USER',
      }),
      showModal (bmenu) {
        if (bmenu === '1') {
          this.showUserModalL = true
        } else if (bmenu === '2') {
          this.showUserModalS = true
        } else if (bmenu === '3') {
          this.showEditModal = true
        }
      },
      loginSubmit (payload) {
        /* console.log(payload.user.value)
        console.log(payload.pwd.value) */
        API.signin(payload.user.value, payload.pwd.value)
          .then(response => {
            if ('error' in response) {
              /* this.snack = { show: true, text: 'There was an error and your login was unsuccessful.', color: 'red' } */
              return
            }
            localStorage.setItem('token', response.token)
            API.user.getOne(response.id).then(response => {
              this.name = response.name
              this.setUserInfo({ user: response.email, name: response.name })
            })
            /* this.snack = { show: true, text: 'Your login was successful!', color: 'success' } */
            /* setTimeout(() => { this.show = false }, this.timeout) */
          })
          .catch(err => {
            console.log(err)
            /* this.snack = { show: true, text: 'There was an error and your login was unsuccessful.', color: 'red' } */
          })
      },
    },
  }
</script>
