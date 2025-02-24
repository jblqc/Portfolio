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
        path: "", // Default child when visiting /work
        name: "work-all",
        component: () => import("@/components/WorkSection/WorkAll.vue"),
      },
      {
        path: ":id", // Child route for WorkSpecific.vue
        name: "work-specific",
        component: () => import("@/components/WorkSection/WorkSpecific.vue"),
        props: true, // Pass route params as props
      },
    ],
  },
  {
    path: "/inquiry",
    name: "inquiry",
    component: () => import("@/pages/Inquiry.vue"),
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
