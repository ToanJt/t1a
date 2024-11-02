import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMath(.*)*",
    name: "NotFound",
    component: () => import("./pages/NotFound.vue"),
  },
  { path: "/", name: "home", component: () => import("./pages/Home.vue") },
  {
    path: "/projects",
    children: [
      {
        path: "",
        name: "projects",
        component: () => import("./pages/Projects.vue"),
      },
      {
        path: ":id",
        name: "project-details",
        component: () => import("../src/pages/ProjectDetails.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../src/pages/About.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../src/pages/Contact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
