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
      close-on-click
      close-on-content-click
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
          @click.stop="showModal(item)"
        >
          <v-list-item-title>
            <v-btn
              block
              color="white"
            >
              {{ item.menuTitle }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <edit-modal
      v-model="showEditModal"
      :fields="modalInfo.fields"
      :title="modalInfo.title"
      :button-text="modalInfo.buttonText"
      @submit-form="modalInfo.function"
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
  import EditModal from '../../pages/EditModal'
  import API from '../../../../api/index'
  export default {
    name: 'DashboardCoreAppBar',
    components: {
      EditModal,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      menuItemList: [],
      modalInfo: { fields: [], function: {}, title: '', buttonText: '' },
      listInOptions: [
        {
          fields: [
            { name: 'user', label: 'Username', default: '' },
            { name: 'pwd', label: 'Password', default: '', type: 'password' },
          ],
          // Function assigned in mounted()
          function: '',
          title: 'Introduce your credentials to log in!',
          buttonText: 'Log in',
          menuTitle: 'Log in',
          showModal: true,
        },
        {
          fields: [
            { name: 'user', label: 'Username', default: '' },
            { name: 'pwd', label: 'Password', default: '', type: 'password' },
            { name: 'name', label: 'Name', default: '' },
          ],
          // Function assigned in mounted()
          function: '',
          title: 'Introduce your credentials to sign up!',
          buttonText: 'Sign up',
          menuTitle: 'Sign up',
          showModal: true,
        },
      ],
      listOutOptions: [
        {
          fields: [],
          function: '',
          title: '',
          buttonText: '',
          menuTitle: 'Log out',
          showModal: false,
        },
      ],
      snack: {
        show: false,
        text: '',
        color: 'red',
      },
      timeout: 2000,
      showEditModal: false,
      showMenu: false,
      accountIconColor: '',
    }),
    computed: {
      ...mapState(['drawer']),
    },
    mounted () {
      // Review function assign
      this.listInOptions[0].function = this.loginSubmit
      this.listInOptions[1].function = this.signinSubmit
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
          this.menuItemList = this.listOutOptions
        } else {
          this.menuItemList = this.listInOptions
        }
      },
      showModal (choice) {
        this.modalInfo = choice
        this.showEditModal = choice.showModal
        // Next line should be reviewed
        // when logout, it's only neccessary to run logout(), we don't want to assign a function to the modal and open it
        if (!this.showEditModal) {
          this.modalInfo.function = ''
          this.logout()
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
        API.signup(payload.user.value, payload.pwd.value, payload.name.value)
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
