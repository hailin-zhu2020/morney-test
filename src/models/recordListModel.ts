//mvc重构，写model代码
/* eslint-disable */
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    create(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createAt = new Date();
        this.data.push(record2);
        this.save();
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];//强制返回值类型
        return this.data;
    },//获取数据
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }//保存数据
};
export default recordListModel;