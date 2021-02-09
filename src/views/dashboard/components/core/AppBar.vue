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
      transition="slide-y-transition"
      closeOnClick
      closeOnContentClick
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          class="ml-2"
          min-width="0"
          overlap
          elevation="0"
          @click="menuItems"
          v-on="on"
        >
          <v-icon
            :color="accountIconColor"
          >
            mdi-account
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItemList"
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
    <test-modal
      v-model="showEditModal"
      :fields="modalList"
      :title="modalTitle"
      :buttonText="modalButtonText"
      @submit-form="modalFunction"
    />
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
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import TestModal from '../../pages/EditModal'
  import API from '../../../../api/index'
  export default {
    name: 'DashboardCoreAppBar',
    components: {
      TestModal,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      modalList: [],
      LoginFieldsList: [
        { name: 'user', label: 'Username', default: '' },
        { name: 'pwd', label: 'Password', default: '', type: 'password' },
      ],
      SigninFieldsList: [
        { name: 'user', label: 'Username', default: '' },
        { name: 'pwd', label: 'Password', default: '', type: 'password' },
        { name: 'name', label: 'Name', default: '' },
      ],
      menuUserItems: [
        { title: 'Log In', id: '1' },
        { title: 'Sign In', id: '2' },
      ],
      menuLogoutItem: [
        { title: 'log out', id: '3' },
      ],
      menuItemList: [],
      snack: {
        show: false,
        text: '',
        color: 'red',
      },
      timeout: 2000,
      showEditModal: false,
      showMenu: false,
      modalFunction: '',
      modalTitle: '',
      modalButtonText: '',
      accountIconColor: '',
    }),
    computed: {
      ...mapState(['drawer']),
    },
    mounted () {
      if ('token' in localStorage) {
        this.accountIconColor = 'success'
      } else {
        this.accountIconColor = ''
      }
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
        setUserInfo: 'SET_USER',
      }),
      logout () {
        localStorage.removeItem('token')
        this.snack = { show: true, text: 'You are logged out!', color: 'green' }
        this.accountIconColor = ''
      },
      menuItems () {
        if ('token' in localStorage) {
          this.menuItemList = this.menuLogoutItem
        } else {
          this.menuItemList = this.menuUserItems
        }
      },
      showModal (bmenu) {
        if (bmenu === '1') {
          this.modalList = this.LoginFieldsList
          this.modalFunction = this.loginSubmit
          this.modalTitle = 'Introduce your credentials to log in!'
          this.modalButtonText = 'Log in'
          this.showEditModal = true
        } else if (bmenu === '2') {
          this.modalList = this.SigninFieldsList
          this.modalFunction = this.signinSubmit
          this.modalTitle = 'Introduce your credentials to sign in!'
          this.modalButtonText = 'Sign in'
          this.showEditModal = true
        } else if (bmenu === '3') {
          this.logout()
          this.showEditModal = false
        }
      },
      loginSubmit (payload) {
        API.signin(payload.user.value, payload.pwd.value)
          .then(response => {
            if ('error' in response) {
              this.snack = { show: true, text: 'There was an error and your login was unsuccessful.', color: 'red' }
              return
            }
            localStorage.setItem('token', response.token)
            API.user.getOne(response.id).then(response => {
              this.name = response.name
              this.setUserInfo({ user: response.email, name: response.name })
            })
            this.showEditModal = false
            this.snack = { show: true, text: 'Your login was successful!', color: 'success' }
            this.accountIconColor = 'success'
          })
          .catch(err => {
            console.log(err)
            this.snack = { show: true, text: 'There was an error and your login was unsuccessful.', color: 'red' }
          })
      },
      signinSubmit (payload) {
        API.signup(payload.user.value, payload.pwd.value, payload.pwd.name)
          .then(response => {
            if ('error' in response | (response.status !== 200 & response.status !== 201)) {
              if ('error' in response) {
                console.log(response.error)
              }
              this.showEditModal = false
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
              API.signin(payload.user.value, payload.pwd.value)
                .then(response => {
                  if ('error' in response) {
                    this.snack = { show: true, text: 'Your signin was successful but there was an error with your login.', color: 'red' }
                    return
                  }
                  localStorage.setItem('token', response.token)
                  API.user.getOne(response.id).then(response => {
                    this.name = response.name
                    this.setUserInfo({ user: response.email, name: response.name })
                  })
                  this.snack = { show: true, text: 'Your signin was successful and you are logged!', color: 'success' }
                  this.showEditModal = false
                  this.accountIconColor = 'success'
                })
                .catch(err => {
                  console.log(err)
                  this.showEditModal = false
                  this.snack = { show: true, text: 'Your signin was successful but there was an error with your login.', color: 'red' }
                })
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
