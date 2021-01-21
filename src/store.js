import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    url: 'http://34.76.18.17:5000',
    user: {
      email: 'some_email@gmail.com',
      pwd: 'some_password',
      token: null,
    },
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_USER (state, payload) {
      state.user.email = payload.user
      state.user.pwd = payload.pwd
      state.user.token = payload.token
    },
  },
  actions: {

  },
})
