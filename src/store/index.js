import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseDatos: [],
    configuracion: [],
    permisos: [],
    dialogoprogress: null,
  },
  mutations: {
    BD(state, n) {
      state.baseDatos = n;
      console.log("STORE: " + n.bd);
    },
    configuracion(state, n) {
      state.configuracion = n;
    },
    permisos(state, n) {
      state.permisos = n;
    },
    dialogoprogress(state) {
      state.dialogoprogress = !state.dialogoprogress;
    },
  },
  actions: {},
  modules: {},
});
