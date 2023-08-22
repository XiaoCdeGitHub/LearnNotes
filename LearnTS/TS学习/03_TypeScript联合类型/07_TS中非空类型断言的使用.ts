export{}

interface IPerSon{
    name:string
    age:number
    friend?:{
        name:string
    }
}
const info:IPerSon = {
    name:"why",
    age:18
}
//可选链 ?.
console.log(info.friend?.name);

//属性赋值
//解决方案一：类型缩小
//解决方案二：非空类型断言 ！(有点危险)
// info.friend?.name = "11" //赋值表达式的左侧不能是可选属性访问

info.friend!.name = "kobe"