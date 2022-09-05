import { createApp } from "vue";
import App from "./App.vue";
import { IMaskComponent } from "vue-imask";
import "./styles.scss";

createApp(App).component("IMaskComponent", IMaskComponent).mount("#app");
