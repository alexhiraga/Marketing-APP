import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './app.scss'
import { createPopper } from '@popperjs/core';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
import roles from './store/roles'
import status from './store/status'
import UnderConstruction from './components/UnderConstruction.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/src/sweetalert2.js'
import { baseApiUrl } from './global.js'
import './plugins/axios'
import './config/msgs'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(createPopper)
Vue.use(VueSidebarMenu)
Vue.use(VueApexCharts)
Vue.use(moment);
window.Apex.chart = { fontFamily: "Rubik" }
Vue.mixin(roles)
Vue.mixin(status)
Vue.component('under-construction', UnderConstruction)
Vue.use(VueSweetalert2)
Vue.use(baseApiUrl)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
