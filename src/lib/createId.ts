//lib表示自己写给自己用的库
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;//第一次保底字符串，第二次保底至少能得到一个0
function createId() {
    id++;
    window.localStorage.setItem('_idMax', id.toString());
    return id;
}

export default createId;