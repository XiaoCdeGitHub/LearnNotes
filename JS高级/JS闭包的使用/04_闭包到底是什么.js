function foo (){
    function bar(){
        console.log('bar');
    }
    return bar
}
let fn = foo()
fn()