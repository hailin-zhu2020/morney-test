//mvc重构，写model代码
/* eslint-disable */
const localStorageKeyName = 'recordList';
const model = {
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },//深拷贝，返回data的值

    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];//强制返回值类型
    },//获取数据
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }//保存数据
};
export default model;