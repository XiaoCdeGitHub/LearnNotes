//区别一:type类型使用范围更广 接口只能用来声明对象
type MyNumber = number;
type IDtype = number|string;

//区别二:在声明对象时,interface可以多次声明
//type不允许两个相同名称的别名同时存在
type PointType1 = {
    x: number
    y: number
}
// type PointType1 = {
//     z?: number
// }
//interface可以对同一个接口多次声明
interface PointType2{
x: number
y: number
}

interface PointType2{
    z?: number
} 

const point: PointType2 ={
    x:100,
    y:200,
    z:300
}

//interface支持继承
interface IPerSon{
    name:string
    age:number
}
interface IKun extends IPerSon{
    kouhao:string
}

const ikun1:IKun ={
    kouhao:"你干嘛哎呦",
    name:'11',
    age:30,
}

//interface可以被类实现（TS面向对象）

//如果是非对象类型的定义：type 如果是对象类型的声明那么用interface
export{}