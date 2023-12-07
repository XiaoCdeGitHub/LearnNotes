//明确的指定<数组>的类型注解


//1.string[] 数组类型，并且数据中存放的字符串类型
//注意事项：在真实的开发中，数组一般放相同类型。不要放不同类型
let names:string[] = ["abc","cba","nba"];
names.push("cuicuisha");


//2.Array<T>泛型

let nums:Array<number> = [123,321,111]


export{}