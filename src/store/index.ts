import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'

Vue.use(Vuex);//把store绑到Vue.prototype.$store=store;store是从main.ts传过来的

const store = new Vuex.Store({
    state: {//data
        recordList: [] as RecordItem[],
    },
    mutations: {//放同步调用methods//不能用this,因为没有
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];//强制返回值类型
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createAt = new Date();
            state.recordList.push(record2);//也可用可选链语法：this.recordList?.push(record2);非常新
            console.log(state.recordList);
            //recordStore.saveRecords();
            store.commit('saveRecords')
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList));
        },//保存数据
    },
    actions: {//放异步调用的方法

    }

});

export default store;