class Person {
    //成员属性：声明成员属性
    name = ""
    age = 0
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
const p1 = new Person("John",13);
const p2 = new Person("kobe",11);
console.log(p1.name,p2.name);