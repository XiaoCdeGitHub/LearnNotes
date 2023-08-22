
//类型别名:type
type MyNumber = number;
const age:MyNumber = 18
type IDtype = number|string

function printID(id:IDtype){
    console.log(id);
}
type PointType = {x:number, y:number, z?:number}
function printPoint(point:PointType){
    console.log(point.x,point.y,point.z);
}
