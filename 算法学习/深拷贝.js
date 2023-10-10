function deepClone(obj,hash =new WeakMap()) {
    if (obj === null) return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (typeof obj !== "object") 
        return obj;
    if (hash.has(obj)) return hash.get(obj);
    let cloneObj;
    if (Array.isArray(obj)) {
        cloneObj = [];
    }
    else {
        cloneObj = Object.create(Object.getPrototypeOf(obj));
    }
    hash.set(obj,cloneObj);
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloneObj[key] = deepClone(obj[key],hash)
        }
    }
    
    return cloneObj;
    
}
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
obj1.prototype = {
    age : 18,
}
const obj4=deepClone(obj1) // 一个深拷贝方法
obj4.name = "update";
obj4.arr[1] = [5,6,7] ; // 新对象跟原对象不共享内存

console.log('obj1',obj1) // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }