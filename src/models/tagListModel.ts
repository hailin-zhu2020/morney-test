/* eslint-disable */
import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');//强制返回值类型
        return this.data;
    },//获取数据
    create(name) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId().toString();
        this.data.push({id: id, name: name});
        this.save();
        return 'success';
    },
    update(id, name) {
        const idList = this.data.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const nameList = this.data.map(item => item.name);
            if (nameList.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(t => t.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }//保存数据
};
export default tagListModel;