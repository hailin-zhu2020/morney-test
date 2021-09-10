import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //导入的是'./router/index.ts',只要是index,都可以省写
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
Vue.config.productionTip = false
//全局引用组件，所有的页面都引用的组件
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)


new Vue({
 router,//router: router的省写方式
  store,
  render: h => h(App)
}).$mount('#app')
