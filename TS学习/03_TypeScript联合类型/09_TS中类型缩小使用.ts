//1.typeof：使用的最多
function pirntID(id:number|string){
    if(typeof id ==="string"){
        console.log(id.length);
    }
}
//2.=== !==平等缩小
//方向的类型判断
type Direction = "left"|"right"|"up"|"down"
function switchDirection(direction:Direction){
if (direction === "left") {
    console.log("左：","角色向左移动");
}else if (direction === "right"){
    console.log("右：","角色向右移动");
}
}

//3.instanceOf传入一个日期，打印日期
function printDate(date:string|Date){
    if(date instanceof Date){
        console.log(date.getTime());
    }else{
        console.log(date);
    }
}
//4.in判断是否有某一个属性
interface ISwim{
    swim:()=>void
}
interface IRun{
    run:()=>void
}

const fish:ISwim ={
    swim:function(){}
}
const dog:IRun={
    run:function(){
    }
}
function move(animal:ISwim|IRun):void{
    if("swim"in animal){
        console.log('我是鱼');
    }else if("run"in animal){
        console.log("我是狗");
    }
}
move(fish)
move(dog)