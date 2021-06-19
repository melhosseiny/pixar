import Vue from "vue";
import Router from "vue-router";

const Movies = () => import("@/views/Movies.vue");
const Docs = () => import("@/views/Docs.vue");

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "Movies",
    component: Movies,
    alias: "/movies"
  },
  {
    path: "/docs",
    name: "Docs",
    component: Docs
  }
];

export default new Router({
  mode: "history",
  routes
})
