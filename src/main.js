import Vue from 'vue'
import App from './App.vue'
import router from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

import axios from 'axios'

import Toasted from 'vue-toasted'

import BaiduMap from 'vue-baidu-map'

import VueQrcode from '@xkeshi/vue-qrcode'

Vue.use(MuseUI)

Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(Toasted)

Vue.use(BaiduMap, {
  ak: 'CrZ1BFDWm5YA1NOG6lMxmo6clw9Ql8Wf'
})

Vue.component('qrcode', VueQrcode)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
