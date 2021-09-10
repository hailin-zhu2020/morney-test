import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //导入的是'./router/index.ts',只要是index,都可以省写
import store from './store'

Vue.config.productionTip = false

new Vue({
 router,//router: router的省写方式
  store,
  render: h => h(App)
}).$mount('#app')
