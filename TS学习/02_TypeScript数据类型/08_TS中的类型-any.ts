//any类型就表示不限制标识符的任意类型，并且可以在该标识符上面进行任意的操作，ts中回到了js
let id:any = "aaa"
id = "bbb"
id = 123
console.log(id.length);

export{}