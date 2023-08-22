// const info:{
//     name:string,
//     age:number
// }={
//     name:"why",
//     age:18
// }

//对象类型和函数类型的结合使用
// function printCoordinate(x:number, y:number){

// }
type PointType = {
    x:number //这里分号，逗号，正确换行都可以
    y:number
    z?:number
}
function printCoordinate(point:PointType){
    console.log(point.x);
    console.log(point.y);
}

export{}