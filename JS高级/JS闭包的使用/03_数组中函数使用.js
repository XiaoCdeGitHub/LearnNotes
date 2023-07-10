var nums = [10,5,11,100,55]
//filter：过滤  返回值是boolean类型
//对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回
let newNums= nums.filter((item,index,arr)=>{
    return item%2 ===0
})
console.log(newNums);
//map：映射  
//对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
let newNums2 = nums.map((item)=>{
    return item*10
})
console.log(newNums2);

//forEach：迭代  没有返回值
let newNums3 = nums.forEach((item,index)=>{

})
//reduce：累加

/* let total = 0
for(let i=0; i<nums.length;i++){
    total += nums[i]
} */

//prevValue 上一次的值
nums.reduce((prevValue,item)=>{
    return prevValue + item
},0)



//find/findIndex
let item = nums.find((item)=>{
    return item === 11
})
console.log(item);

let friends = [
{name:'why',age:18},
{name:'kobe',age:18},
{name:'james',age:35},
{name:'curry',age:30},

]
const findFriend  = friends.find((item)=>{
    return item.name === 'james'
})
console.log(findFriend);

const friendIndex =  friends.findIndex((item)=>{
    return item.name === 'james'
})
console.log(friendIndex);