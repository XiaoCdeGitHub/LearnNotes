//1.死循环
function foo (){
    while(true){

    }
}
export{}

//2.解析歌词的工具
function bar(){
    return []
}

//封装工具-开发框架时可以使用never
//其他时候对于一些没有处理的case，可以直接报错
function handleMessage(message:string|number){
    switch(typeof message){
        case  "string":
        console.log(message.length);
        break
        case "number":
        console.log(message);
        break
        default:
            const check:never =message
    }
}
