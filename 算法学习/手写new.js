function myNew(Func,...args) {
  const obj = Object.create(Func.prototype);
    let result = Func.apply(obj, args)
    return result instanceof Object ? result : obj;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = myNew(Person, "huihui", 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() // huihui
