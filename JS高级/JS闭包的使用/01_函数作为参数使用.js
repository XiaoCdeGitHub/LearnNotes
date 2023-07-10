// function foo(arg){
//     console.log('foo',arg);
// }
// foo(123);
function foo(aaaa){
    aaaa()
}
function bar(){
    console.log('bar');
}
foo(bar);
