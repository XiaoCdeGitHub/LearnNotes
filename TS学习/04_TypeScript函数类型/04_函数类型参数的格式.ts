type CalcType = (num1:number, num2:number)=>number

function calc(calcFn:CalcType){
    const num1 = 10;
    const num2 = 20;
    const res = calcFn(num1,num2)
    console.log(res)
}
function sum(num1:number,num2:number){
    return num1 + num2
}
calc(sum)
//ts不校验传入函数参数的个数
calc(function(){
    return 123
})
export{}