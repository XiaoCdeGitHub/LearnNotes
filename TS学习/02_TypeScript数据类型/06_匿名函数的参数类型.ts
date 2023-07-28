//匿名函数是否需要添加类型注解呢？最好不要添加类型注解
const names:string[] = ["abc","cba","ddd"]
names.forEach(function(item,index,arr){
    console.log(item,index,arr);
});
export{}