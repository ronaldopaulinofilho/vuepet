import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueTheMask from "vue-the-mask";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/pt-br";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(ElementUI, { locale });
Vue.use(VueTheMask);
Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
