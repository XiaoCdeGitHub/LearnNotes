//filter for循环
const boo = [1, 2, 3, 4, 5];
console.log(boo[1]);
boo.filter(() => { })
interface Func{
  (number): () => {
    
   }
}
const myFilter = (arg:number[],index,func:Func) => {
      let args:number[] = []
    for (let i = 0; i < arg.length; i++){
        const res = func(arg[i])
             args.push()
        }
        return args;
}


