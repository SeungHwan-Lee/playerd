// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTable, faPlus, faTimes, faKey} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$event = new Vue()

Vue.use(BootstrapVue)
library.add(faTable, faPlus, faTimes, faKey)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
