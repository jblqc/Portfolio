import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HeroSection.vue"),
    meta: { isHome: true },
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
  },
  {
    path: "/journey",
    name: "journey",
    component: () => import("@/pages/Journey.vue"),
  },
  {
    path: "/story",
    name: "story",
    component: () => import("@/pages/Story.vue"),
  },
  {
    path: "/version",
    name: "version",
    component: () => import("@/components/Version.vue"),
  },
  {
    path: "/add-story",
    name: "add-story",
    component: () => import("@/components/Story/AddStory.vue"),
    meta: { hidden: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Add special handling for home route
    if (to.meta.isHome && from.meta.isHome) {
      return { top: 0, behavior: "instant" };
    }
    return { top: 0 };
  },
});

// Add this navigation guard
router.beforeEach((to, from, next) => {
  // Force reload when navigating to home from home
  if (to.name === "home" && from.name === "home") {
    window.location.reload();
    return;
  }
  next();
});

export default router;
