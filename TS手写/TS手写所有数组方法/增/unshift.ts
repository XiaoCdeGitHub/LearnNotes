Array.prototype.unshift = myUnshift;
//unshift方法用于向数组的开头添加一个或多个元素，并返回修改后的数组的新长度
function myUnshift(...args:any[]){
    console.log('重写unshift方法');
    const newArray = [...args,...this]
    for (let i = 0;i<newArray.length;i++){
        this[i] = newArray[i]
    }
    return newArray.length;
}
const b = [1, 2, 3];
b.unshift(5)
console.log(b);
