//手写Promise

//硬编码hard code 会给代码的维护带来一些困难
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise{
    #state = PENDING;
    #rejected = undefined;
    constructor(executor){
        const resolve =() =>{};
        const rejected =() =>{};
    }
   executor(resolve,reject)
}

const p = new MyPromise ((resolve,reject)=>{
    // resolve(123);
    throw (123)
});



console.log(p);

