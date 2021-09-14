/*定义全局类型*/
type RecordItem = {
    tags: string[]
    notes: string
    types: string
    amount: number //数据类型
    createAt?: Date //类或者叫构造函数 //？表示可以不存在
}//类型声明