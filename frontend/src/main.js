// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTable, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import jquery from 'jquery'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.jquery = jquery

Vue.use(BootstrapVue)
library.add(faTable, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// eventBus
export const eventBus = new Vue()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})


/**
 * 전역 로그
 * @param option 옵션 'to' -> toString
 * @param obj toString할 객체
 * @constructor
 */
window.JSLog = function (option, obj) {
  if (option == 'to') {
    var log = ''
    var objs = []
    var i = 0
    for (var prop in obj) {
      if(i != 0) {
        log += 'JSLog: '
      }
      i++
      log += prop+' : '+obj[prop] + '\n'
      if(typeof(obj[prop]) == 'object') {
        objs.push({
          name: prop,
          o: obj[prop]
        });
      }
    }
    JSLog(log)
    objs.forEach(function(v){
      JSLog('-> '+v.name)
      JSLog('to', v.o)
    })
  } else {
    var args = Array.prototype.slice.call(arguments)
    if (window.console) console.log('JSLog: ' + args.join(' | '))
  }
}
