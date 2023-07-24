## ***基础类型***
```typescript
//布尔值
let isDone: boolean = false;
//数字
let decLiteral:number = 6;
let hexLiteral:number = 0xf00d;
let binaryLiteral:number =0b1010;
let octalLiterals:number =0o744;
//字符串
let name:string = "bob";
name = "smith";
let name:string = `CuiDing`;
let age:number = 20;
let sentence:string = `Hello,my name is ${name}`
//数组
let list:number[] = [1,2,3,4,5];
let list:Array<number> =[1,2,3,4,5];
//元组Tuple
let x:[string,number];
x=['hello', 10]

//枚举
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
enum Color {Red,Green,Blue}
let c:Color = Color.Green;

默认情况 元素编号从0开始，也可手动更改每个元素对应的编号
enum Color {Red = 1,Green=3,Blue=4}
let c:Color = Color.Green;

枚举提供的便利是可以由枚举的值得到他的名字，有数值得到对应的在Color里的映射
enum Color {Red = 1,Green,Blue}
let colorName:string = Color[2];//Green

//Unknown

当我们在写应用的时候可能会需要描述一个我们还不知道其类型的变量。这些值可以来自动态内容，例如从用户获得，或者我们想在我们的 API 中接收所有可能类型的值。
在这些情况下，我们想要让编译器以及未来的用户知道这个变量可以是任意类型。这个时候我们会对它使用 unknown 类型。

let notSure : unknown = 4;
notSure = "maybe a string instead"
notSure = false;


//Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 
这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用any类型来标记这些变量：

let notSure:any = 4;
notSure = "maybe a string instead";
notSure = false;
使用 any 类型的代码可以接受任何类型的参数和返回值，它可以使代码变得更加灵活，方便进行快速的开发和原型设计。但是，使用 any 类型也会使代码失去类型检查和类型安全，因为编译器无法检查 any 类型的变量是否符合期望的类型。

因此，使用 any 类型的代码应该尽量避免在生产环境中使用，特别是在需要对代码进行维护和扩展的情况下。在开发过程中，使用 any 类型可以帮助快速迭代和开发，但最终应该尽可能将其替换为更具体的类型，以提高代码的可读性、可维护性和类型安全性。


//ts中unknown和any的区别
在 TypeScript 中，unknown 和 any 都是用来表示不确定类型的值的。但是它们之间有一些重要的区别。

any 类型可以被赋值为任何类型的值，因此它提供了最大的灵活性，但也带来了最大的风险。使用 any 类型会使代码的类型检查失去作用，因为它可以接受任何类型的值，包括不安全的操作，这可能会导致潜在的运行时错误和不良的代码质量。

unknown 类型表示一个未知类型的值。与 any 类型不同的是，你不能对 unknown 类型的值进行任何操作，除非你先进行类型检查或类型断言。这意味着在使用 unknown 类型时，你必须显式地检查类型，以确保类型安全。这种方式虽然不如 any 类型灵活，但是可以提供更高的类型安全性。

总的来说，如果你需要一个可以接受任意类型值的变量，并且你已经知道这个变量的类型，那么使用 any 类型是可行的。但是如果你不知道变量的类型，或者你需要对该变量进行类型检查，那么使用 unknown 类型是更好的选择。


any类型可以在编译时，。选择性地包含或移除类型检查
与Object类型的变量区别：
Object只是允许赋给他任意值，但是不能在它上面调用任意的方法，即使真的有这些方法
let notSure:any = 4;
notSure.ifItexists();//ok
notSure.toFixed();//ok

let prettySure:Object = 4;
prettySure.toFixed();//报错

当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

let list: any[] = [1, true, "free"];

list[1] = 100;

//Void
某种程度，void类型与any类型相反，表示没有任何类型，一个函数没有返回值的时候，返回值类型就是void
function warnUser():void{
    console.log("This is warning message")
}
声明void值只能赋值null和undefined
let unsuable: void = undefined;

//Null和Undefined

let u:undefined = undefined;
let n:null = null;
默认情况下，null 和 undefined 是所有类型的子类型，可以把null和undefined赋值给 number 类型的变量。

当制定了--strictNullChecks标记 null 和 undefined 只能赋值给any和各自的类型。
例外：undefined 可以赋值给void类型

//Never
表示永远不存在值的类型
never类型是那些总会抛出类型或根本就不会有返回值的函数表达式或箭头表达式的返回值类型，变量也可能是never类型，当它们被永不为真的类型保护所约束时。


never类型是任何类型的子类型,也可以赋值给任何类型

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

//Object 
非原始类型，除了number，string，boolean，bigint，symbol，null或者undefined之外的类型

在 TypeScript 中，Object 是一个表示所有对象类型的顶级类型。也就是说，所有的对象类型都可以看作是 Object 类型的子类型。

在 TypeScript 中，Object 类型有以下特点：

Object 类型可以被赋值为任何对象类型的值，包括普通对象、数组、函数、类等。

Object 类型的变量只能访问对象类型的共有属性和方法，不能访问私有属性和方法。

Object 类型的变量不能进行类型断言，因为它是一个顶级类型，没有更具体的类型信息。

下面是一个使用 Object 类型的示例：

typescript
Copy
// 定义一个 Object 类型的变量
let obj: Object;

// 可以将任何对象类型的值赋值给 obj 变量
obj = { name: "张三", age: 18 };
obj = [1, 2, 3];
obj = function add(a: number, b: number): number {
  return a + b;
};

// 访问 obj 的共有属性和方法
console.log(obj.toString());

// 不能访问 obj 的私有属性和方法
// console.log(obj.valueOf());

// 不能进行类型断言
// console.log((obj as string).toUpperCase());
需要注意的是，虽然 Object 类型可以接受任何对象类型的值，但是在实际开发中，我们应该尽量使用更具体的对象类型，以提高代码的可读性和类型安全性。
```

## ***类型断言 ***

不进行特殊的数据检查和结构，没有运行时的影响，只是在编译阶段起作用，ts会假设我已经做了必要的检查
```ts
//1.尖括号语法
let someValue:any = "this is a string";
let strLength:number = (<string>SomeValue).length;
//2.as语法
let someValue:any = "this is a string";
let strLength:number = (someValue as string).length;

```
在ts里使用jsx语法时，只有as语法断言是被允许的。



## ***接口***

```ts
interface LabeledValue{
    label : string;
}
function printLabel(labeledObj:labeledValue){
console.log(labeledObj.label);
}
let myObj = {size:10,label:"Size 10 Object"};
printLabel(myObj);

```
LabeledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个label属性且类型为string的对象。


类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### ***接口可选属性***
接口内的属性不全是必须的，有些只是在某些条件下存在，或者根本不存在
```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

```
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号
可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将createSquare里的color属性名拼错，就会得到一个错误提示。


### ***接口只读属性***
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用readonly来指定只读属性:

```ts
interface Point{
    readonly x:number;
    readonly y:number;
}
let p1:Point = { x:10,y:20};
p1.x = 5//error!

```

TypeScript 具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```
上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[];

### readonly vs const
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly

## 额外的属性检查

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
TypeScript 会认为这段代码可能存在 bug。 对象字面量会被特殊对待而且会经过_额外属性检查_，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
绕开这些检查非常简单。 最简便的方法是使用类型断言：

let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

