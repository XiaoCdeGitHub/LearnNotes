/**
 * new关键字
 * 1.创建一个新的对象
 * 2.将新创建对象的__proto__指向构造函数的prototype
 * 3.将构造函数的this指向新创建的对象
 * 4.如果构造函数没有返回值或者返回值不是对象，则返回新创建的对象，否则返回构造函数的返回值
 * 
 */
function myNew(func, ...args) {
    const obj = {};
    obj._proto_ = func.prototype;
    let result = func.apply(obj, args)
    return result instanceof Object ? result : obj;
}


function Person(name,age) {
    this.name = name;
    this.age = age;
    
}
Person.prototype.sayName = function () {
    console.log(this.name);
}
let p1 = myNew(Person, 'mike', 180);
let p2 = new Person();
console.log(p1);
console.log(p2);

