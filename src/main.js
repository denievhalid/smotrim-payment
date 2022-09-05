import { createApp } from "vue";
import App from "./App.vue";
import { IMaskComponent } from "vue-imask";
import { SimpleSVG } from "vue3-simple-svg";

import "./styles.scss";

createApp(App)
  .component("simple-svg", SimpleSVG)
  .component("IMaskComponent", IMaskComponent)
  .mount("#app");
