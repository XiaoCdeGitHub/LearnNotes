// function add(arg1, arg2) {
//     return arg1 + arg2;
// }
// add(10, 20)
// add("abc", "def")
// add({ aaa: "aaa" }, 123)

//1.实现两个函数
// function add1(num1: number, num2: number) {
//     return num1 + num2;
// }
// function add2(str1: string, str2: string) {
//     return str1 + str2;
// }
// add1(10, 20)
// add2("abc", "def")

//2.错误的做法 联合类型是不可以的
// function add(arg1: number | string, arg2: number | string) {
//     return arg1 + arg2;
// }

//3.ts中函数的重载写法
//3.1先编写重载签名
function add(num1: number, num2: number): number
function add(str1: string,str2:string):string

//3.2编写通用函数实现
function add(arg1: any, arg2: any) { 
    return arg1 + arg2;
}
add(10, 10)
add("abc", "def")
// add({ aaa: "aaa" }, 123)//err:没有与此调用匹配的重载