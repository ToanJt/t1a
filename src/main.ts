import { createApp } from "vue";
import "./style.css";
import "../text-particles.js";
import { router } from "./router.ts";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import App from "./App.vue";
const app = createApp(App);
app.use(router);

app.mount("#app");
