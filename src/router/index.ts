import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "WorldMap",
      component: () => import("../views/WorldMapView.vue"),
      meta: {
        title: "World Map",
      },
    },
    {
      path: "/map",
      name: "WorldMap",
      component: () => import("../views/WorldMapView.vue"),
      meta: {
        title: "World Map",
      },
    },
    {
      path: "/valley/:id",
      name: "ValleyMap",
      component: () => import("../views/ValleyView.vue"),
      meta: {
        title: "Valley Map",
      },
    },
    {
      path: "/town/:id",
      name: "Town",
      component: () => import("../views/TownView.vue"),
      meta: {
        title: "Town",
      },
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      redirect: { name: "WorldMap" },
    },
  ],
});

router.afterEach((to, from) => {
  document.title = to.meta.title ? to.meta.title! : "Travi";
});
export default router;
