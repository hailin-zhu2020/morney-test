/*定义全局类型*/
type RecordItem = {
    tags: string[]
    notes: string
    types: string
    amount: number //数据类型
    createAt?: Date //类或者叫构造函数 //？表示可以不存在
}//类型声明
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    create: (name: string) => 'success' | 'duplicated'; //联合类型
    remove: (id: string) => boolean;
    save: () => void;
}//变量和方法都可以类型申明

interface Window {
    tagList: Tag[];
}
