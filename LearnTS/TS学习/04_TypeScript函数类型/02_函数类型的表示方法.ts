//方案一：函数类型表达式function type expression 为了给函数一个类型
//格式：（参数列表）=>返回值
//参数列表里面参数名不能省略（num1）
type BarType = (num1:number) => number
const bar:BarType =(arg)=>{
    return 123
}



export{}