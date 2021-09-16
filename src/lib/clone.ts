function clone(data: any) {
    return JSON.parse(JSON.stringify(data));
}//深拷贝，将data的新值返回
export default clone;