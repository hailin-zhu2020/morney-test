//问题1：全局变量太多;解决方案：全部放到到store对象里
//问题2：严重依赖window；解决方案：放到一个ts文件中并导出
import recordListModel from '@/models/recordListModel'
import tagListModel from '@/models/tagListModel'

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        return recordListModel.create(record);
    },
    //tag store
    tagList: tagListModel.fetch(), //数据变成全局变量，使得各页面引用同一个数据
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        //提示用户成功或者异常原因
        if (message === 'duplicated') {
            window.alert('标签重复！');
        } else if (message === 'success') {
            window.alert('添加成功!');
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
};
export default store;