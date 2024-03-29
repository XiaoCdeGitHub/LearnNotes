//1.普通的实现
//2.函数的重载签名
// function getLength(arg:string):number
// function getLength(arg:any[]):number {
//     return arg.length
// }
// getLength("aaa")
// getLength(["aaa","bbb","ccc"])


// //3.联合类型实现
// function getLength(arg: string | any[]) {
//     return arg.length
// }
// getLength("aaa")
// getLength(["aaa", "bbb", "ccc"])
//可以使用联合类型的情况，尽量使用联合类型

//4.对象类型实现
function getLength(arg: { length: number }) { 
    return arg.length
}
getLength("aaa")
getLength(["aaa", "bbb", "ccc"])

