//mvc重构，写model代码
/* eslint-disable */
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },//深拷贝，返回data的值

    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];//强制返回值类型
        return this.data;
    },//获取数据
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }//保存数据
};
export default recordListModel;