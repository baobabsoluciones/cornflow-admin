import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    execution_id: null,
    user: {
      email: 'some_email@gmail.com',
      name: '',
    },
    data: {
      instance: null,
      solution: null,
    },
  },
  mutations: {
    INITIALIZE_STORE (state) {
      state.execution_id = localStorage.getItem('execution_id')
    },
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_USER (state, payload) {
      state.user.email = payload.user
      state.user.name = payload.name
    },
    SET_LAST_EXECUTION (state, payload) {
      localStorage.setItem('execution_id', payload.execution)
      state.execution_id = payload.execution
    },
    SET_DATA (state, payload) {
      state.data.instance = payload.instance
      state.data.solution = payload.solution
    },
  },
  actions: {

  },
})
