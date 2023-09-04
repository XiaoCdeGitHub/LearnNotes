class Person{
    readonly name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

}


const p = new Person("why", 18)
console.log(p.name,p.age);

// p.name = "John" //无法为“name”赋值，因为它是只读属性

export{}