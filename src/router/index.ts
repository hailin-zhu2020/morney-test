import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/money' //重定向
    },//默认到money页面
    {
        path: '/money',
        component: Money
    },
    {
        path: '/labels',
        component: Labels

    },
    {
        path: '/labels/edit',
        component: EditLabel

    },
    {
        path: '/statistics',
        component: Statistics
    },
    {

        path: '*',// 会匹配所有路径
        component: NotFound
    }//地址输错时，渲染404页面

]

const router = new VueRouter({
    routes
})

export default router
