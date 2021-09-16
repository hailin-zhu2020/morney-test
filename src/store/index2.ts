import recordStore from '@/store/recordStore'
import tagStore from '@/store/tagStore'

const store = {
    ...recordStore, //浅拷贝，只复制地址
    ...tagStore,

};

export default store;