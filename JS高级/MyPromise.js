//手写Promise

//硬编码hard code 会给代码的维护带来一些困难
const PENDING = 'pending';
const FULFILLED = 'fufilled';
const REJECTED = 'rejected';


class MyPromise{
    #state = PENDING;
    #result = undefined;
    // executor 执行器 任务 同步执行
    constructor(executor){
        const resolve = (data) => {
            this.#changeState(FULFILLED, data);
        };
        const reject = (reason) => {
            this.#changeState(REJECTED, reason);

        };
        try{
            executor(resolve,reject);
        }
        catch(err){
            reject(err)
        }
    }
    #changeState(state,result){
        if(this.#state !== PENDING) return;
        this.#state = state;
        this.#result = result;
        console.log(this.#state,this.#result);
    }
    
}

const p = new MyPromise ((resolve,reject)=>{
    resolve(123);
});



console.log(p);

//try捕获不到异步错误，promise状态还是pending
/* setTimeout(()=>{
    throw 123;
},0) */