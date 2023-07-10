function createFnArray(){
    // 占据的空间是4M
    let arr = new Array(1024*1024).fill(1);
    return  function(){
        console.log(arr.length);
    }
}
let arrayFns = []
// let arrFn = createFnArray();
for (let i=0; i<100; i++){
    setTimeout(()=>{
        arrayFns.push(createFnArray(),i*100);
    })
}
setTimeout(()=>{
    for(let i = 0; i<100; i++){
        setTimeout(()=>{
            arrayFns.pop();
        },100*i)
    }},10000)