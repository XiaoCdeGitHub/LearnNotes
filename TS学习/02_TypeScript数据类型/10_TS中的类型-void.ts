//当一个函数没有返回值的时候，返回值就是void类型
//如果返回值是void类型，那我们也可以返回undefined
function sum(a: number, b: number){
    console.log(a+b);
}


//应用场景 用来指定函数类型的返回值是void
type LyricInfoType={time:number,text:string}
function parseLyric(lyric:string):LyricInfoType[]{
const lyricInfos:LyricInfoType[] =[]
return lyricInfos
}

type FooType = () => void
const foo:FooType = () => {}


export{}