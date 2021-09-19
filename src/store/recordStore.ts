//model代码全部放到这了
import clone from '@/lib/clone'

const localStorageKeyName = 'recordList';

const recordStore = {
    //record store
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];//强制返回值类型
        return this.recordList;
    },//获取数据
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },//保存数据
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createAt = new Date().toISOString(); //ISO8601
        this.recordList && this.recordList.push(record2);//也可用可选链语法：this.recordList?.push(record2);非常新
        recordStore.saveRecords();
    },
}
recordStore.fetchRecords();
export default recordStore;