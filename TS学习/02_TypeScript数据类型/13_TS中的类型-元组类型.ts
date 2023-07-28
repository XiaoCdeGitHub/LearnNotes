//保存个人信息
//1.使用数组 不合适,数组中最好村官方相同数据类型,获取值之后不能明确的知道对应的数据类型



//2.适用对象类型(最多) 代码量比较大 有键



//3.使用元组类型
const info3:[string,number,number] = ["why",18,1.88]
//函数中使用元组最多,函数的返回值
function useState(initialState:number):[number,(newValue:number)=>void]{
    let stateValue = initialState
    function setValue(newValue:number){
        stateValue = newValue
    }
    return [stateValue,setValue]
}

const [count,setCount] = useState(10)
console.log(count);
setCount(100)
export{}


