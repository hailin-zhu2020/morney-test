function clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}//深拷贝，将data的新值返回
export default clone;