Array.prototype.push = myPush
//push将新元素追加到.length，并返回数组的新长度。
// 重写push方法
function myPush(...items: any[]): number {
    console.log('重写push方法');
    let len = this.length
    for (let i = 0; i < items.length; i++) {
        this[len + i] = items[i]
    }
    return this.length
}

const a = [1, 2, 3];
a.push(5)
console.log(a);
