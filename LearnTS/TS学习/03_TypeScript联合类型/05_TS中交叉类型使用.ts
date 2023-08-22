type ID = number | string
const id1:ID = "123"
const id2:ID = 123


type NewType = number & string

interface IKun{
    name:string,
    age:number
}
interface ICoder{
    name:string
    coding:()=>void
}
const info:IKun & ICoder ={
    name:"why",
    age:18,
    coding:function(){
        console.log("coding");
    }
}