// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stroe'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import global from "./global";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.GLOBAL = global;

/* eslint-disable no-new */
export const vue = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});


