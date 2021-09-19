import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'

Vue.use(Vuex);//把store绑到Vue.prototype.$store=store;store是从main.ts传过来的

const store = new Vuex.Store({
    state: {//data
        recordList: [] as RecordItem[],
        tagList: [] as Tag[],
        currentTag: undefined
    } as RootState,
    mutations: {//放同步调用methods//不能用this,因为没有
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];//强制返回值类型
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createAt = new Date().toISOString();
            state.recordList.push(record2);//也可用可选链语法：this.recordList?.push(record2);非常新
            console.log(state.recordList);
            //recordStore.saveRecords();
            store.commit('saveRecords')
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList));
        },//保存数据
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');//强制返回值类型
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('添加成功!');
            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            store.commit('saveTags');
            window.alert('添加成功!');
        },
        updateTag(state, payload: { id: string, name: string }) {//只能有两个参数
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const nameList = state.tagList.map(item => item.name);
                if (nameList.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(t => t.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                window.alert('刪除失敗！');
            }

        },

        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },


    },
    actions: {//放异步调用的方法

    }

});

export default store;