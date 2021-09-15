/* eslint-disable */
const localStorageKeyName = 'tagList';
type TagListModel = {
    data: string[];
    fetch: () => string[];
    create: (name: string) => 'success' | 'duplicated'; //联合类型
    save: () => void;
}//变量和方法都可以类型申明

const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');//强制返回值类型
        return this.data;
    },//获取数据
    create(name) {
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        }
        this.data.push(name);
        this.save();
        return 'success';
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }//保存数据
};
export default tagListModel;