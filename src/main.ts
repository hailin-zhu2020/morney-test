import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //导入的是'./router/index.ts',只要是index,都可以省写
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;
//全局引用组件，所有的页面都能引用的组件
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch(); //数据变成全局变量，使得各页面引用同一个数据
window.createTag = (name: string) => {
    const message = tagListModel.create(name);
    //提示用户成功或者异常原因
    if (message === 'duplicated') {
        window.alert('标签重复！');
    } else if (message === 'success') {
        window.alert('添加成功!');
    }
};
new Vue({
    router,//router: router的省写方式
    store,
    render: h => h(App)
}).$mount('#app');
