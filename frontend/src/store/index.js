import Vue from 'vue';
import Vuex from 'vuex';

import AuthService from '@/services/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: process.env.VUE_APP_URL,
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isUserLoggedIn: localStorage.getItem('token') || false,
  },
  getters: {
    GE_URL(state) {
      return state.url;
    },
    GE_TOKEN(state) {
      return state.token;
    },
    GE_USER_DATA(state) {
      return state.user;
    },
    GE_LOGIN_STATUS(state) {
      return state.isUserLoggedIn;
    },
  },
  mutations: {
    MU_SET_TOKEN(state, token) {
      state.token = token;

      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    MU_SET_USER(state, data) {
      state.user = data;
    },
    MU_CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
      state.isUserLoggedIn = false;
    },
  },
  actions: {
    AC_SIGN_IN({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        AuthService.signIn(credentials)
          .then((response) => {
            console.log('AC_SIGN_IN - response : ', response);
            commit('MU_SET_TOKEN', response.data.token);
            localStorage.setItem('token', response.data.token);
            resolve(response.data.token);
          })
          .catch((error) => {
            console.log('AC_SIGN_IN - error : ', error);
            reject(error);
          });
      });
    },
    AC_SIGN_UP({ commit }, data) {
      return new Promise((resolve, reject) => {
        AuthService.signIn(data)
          .then((response) => {
            console.log('AC_SIGN_UP - response : ', response);
            commit('MU_SET_TOKEN', response.data.token);
            localStorage.setItem('token', response.data.token);
            resolve(response.data.token);
          })
          .catch((error) => {
            console.log('AC_SIGN_UP - error : ', error);
            reject(error);
          });
      });
    },
    AC_GET_USER_DATA({ commit }, token) {
      return new Promise((resolve, reject) => {
        AuthService.getUserData(token)
          .then((response) => {
            console.log('AC_GET_USER_DATA - response : ', response);
            commit('MU_SET_USER', response.data.data);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            resolve(response.data.data);
          })
          .catch((error) => {
            console.log('AC_GET_USER_DATA - error : ', error);
            reject(error);
          });
      });
    },
    AC_SIGN_OUT({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('MU_CLEAR_AUTH');
      console.log('logtout')
    },
  },
  modules: {},
});

// state: ?????? ??? ??????, ???????????? ??? ???????????? ????????? ??????
// main.js ?????? ??????????????? store ????????? ?????? -> ?????? ?????????????????? this.$store ??? ?????? ??????
// 1 app - 1 store: ?????? ?????? ??????

// getters: state??? ????????? ????????? ?????? ===> computed

// mutations: state ??? ?????? ===> methods, commit?????? ??????

// actions: ????????? ?????? ??????, dispatch??? ??????
// commit??? ?????? ??? ???????????? ?????? ?????? ????????? ??????????????? ?????? ES2015 ???????????? ?????? ??????
