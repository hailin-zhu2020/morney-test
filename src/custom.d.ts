/*全局变量类型声明*/
type RootState = {
    recordList: RecordItem[],
    createRecordError: Error | null,
    tagList: Tag[],
    currentTag?: Tag
}//store里面用到的数据类型
type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number //数据类型
    createAt?: string //Date json不支持Date //类或者叫构造函数 //？表示可以不存在
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



