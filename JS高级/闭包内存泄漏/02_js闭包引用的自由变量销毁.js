function foo(){
    let name = 'foo'
    let age = 18
    function bar(){
        console.log(name);
        console.log(age);
    }
    return bar
}
let fn = foo()
fn()
let baz = foo()
baz()