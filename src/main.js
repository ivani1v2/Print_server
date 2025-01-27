import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { auth } from "./db";
import "firebase/auth";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);

const vuetify = new Vuetify();

// ✅ Configurar modo 'hash' para producción
router.mode = process.env.NODE_ENV === "production" ? "hash" : "history";

let app = null;

// ✅ Control de sesión Firebase
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
