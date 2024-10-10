import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Projects from "./pages/Projects.vue";
import About from "../src/pages/About.vue";
import Contact from "../src/pages/Contact.vue";
import ProjectDetails from "../src/pages/ProjectDetails.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/projects",
    children: [
      {
        path: "",
        name: "projects",
        component: Projects,
      },
      {
        path: ":id",
        name: "project-details",
        component: ProjectDetails,
        props: true,
      },
    ],
  },
  { path: "/about", name: "about", component: About },
  { path: "/contact", name: "contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
