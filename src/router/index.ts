import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: "/start",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/map",
      name: "WorldMap",
      component: () => import("../views/WorldMapView.vue"),
    },
    {
      path: "/valley/:id",
      name: "ValleyMap",
      component: () => import("../views/ValleyView.vue"),
    },
  ],
});

export default router;
