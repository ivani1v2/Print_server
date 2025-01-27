import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/panel",
    name: "panel",
    // route level code-splitting
    // this generates a separate chunk (Produc.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "carrito" */ "../views/panel.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

// ✅ Forzar modo 'hash' en producción y 'history' en desarrollo
const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((ruta) => ruta.meta.requireAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({
        name: "Home",
      });
    }
  } else {
    next();
  }
});
export default router;
