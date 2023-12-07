var name = 'jack';
function fn(name) {
    this.name = name;
    console.log('1',this.name);
}

var f1 = fn('rose');
console.log('name', name);
var f2 = new fn();
console.log('f2.name',f2);
