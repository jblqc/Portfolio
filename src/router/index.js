import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HeroSection.vue"),
  },
  {
    path: "/work",
    component: () => import("@/pages/WorkShowCase.vue"), // Parent Layout
    children: [
      {
        path: "", // Redirect /work to /work/all
        redirect: "/work/all",
      },
      {
        path: "all", // Default child for /work
        name: "work-all",
        component: () => import("@/components/WorkSection/WorkAll.vue"),
      },
      {
        path: ":id", // Child route for WorkSpecific.vue
        name: "work-specific",
        component: () => import("@/components/WorkSection/WorkSpecific.vue"),
        props: true, // Ensure params are passed

      },
    ],
  },
  
  {
    path: "/inquiry",
    name: "inquiry",
    component: () => import("@/pages/Inquiry.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/About.vue"),
  }, {
    path: "/journey",
    name: "journey",
    component: () => import("@/pages/Journey.vue"),
  },
  {
    path: "/story",
    name: "story",
    component: () => import("@/pages/Story.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    return { top: 0 };
  },
});
export default router;
