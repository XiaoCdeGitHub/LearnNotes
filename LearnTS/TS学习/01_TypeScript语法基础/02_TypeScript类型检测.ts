function getLength(args:string |any[]){
    return args.length
    }
    //调用函数
    console.log(getLength("aaa"));
    console.log(getLength([1,2,3,4]));
     
    getLength(123)

    getLength()

export{}