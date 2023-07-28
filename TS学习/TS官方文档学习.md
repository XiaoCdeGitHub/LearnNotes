# TypeScript学习笔记

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
```
//Object 
非原始类型，除了number，string，boolean，bigint，symbol，null或者undefined之外的类型

在 TypeScript 中，Object 是一个表示所有对象类型的顶级类型。也就是说，所有的对象类型都可以看作是 Object 类型的子类型。

在 TypeScript 中，Object 类型有以下特点：

Object 类型可以被赋值为任何对象类型的值，包括普通对象、数组、函数、类等。

Object 类型的变量只能访问对象类型的共有属性和方法，不能访问私有属性和方法。

Object 类型的变量不能进行类型断言，因为它是一个顶级类型，没有更具体的类型信息。

下面是一个使用 Object 类型的示例：

```typescript

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
```
需要注意的是，虽然 Object 类型可以接受任何对象类型的值，但是在实际开发中，我们应该尽量使用更具体的对象类型，以提高代码的可读性和类型安全性。


##  类型断言  

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
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?
符号可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将createSquare里的color属性名拼错，就会得到一个错误提示。


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

#### readonly vs const
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly

### 额外的属性检查

```ts 
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });```
TypeScript 会认为这段代码可能存在 bug。 对象字面量会被特殊对待而且会经过_额外属性检查_，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
```
// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });```
绕开这些检查非常简单。 最简便的方法是使用类型断言：

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
或者使用字符串索引签名
```ts
interface SquareConfig{
  color?string;
  width?number;
  [propName:string]:any;
}
```

这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么

### ***函数类型***

接口除了可以用来描述带有属性的普通对象，还可以描述函数类型。

为了使用接口表示函数类型，我们需要**给接口定义一个调用签名**。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型
```
interface SearchFunc{
  (source:string,subString:string):boolean;
}
```
这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
```ts
let mySerch:searchFunc;
mySearch  = function(source:string,subString:string){
  let result = source.search(subString);
  return result > -1;
}
//参数类型相同就可以，参数名不同没关系
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
//也可以不指定类型
let mySearch:SearchFunc;
mySearch = function(src,sub){
  let result = src.search(sub);
  return result > -1;
}
```
### ***可索引的类型***

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。 可索引类型具有一个_索引签名_，它描述了对象索引的类型，还有相应的索引返回值类型。 让我们看一个例子：
```ts
interface StringArray{
  [index: number]:string;
}
let myArray:StringArray;
myArray = ["Bob","Fred"];


let myStr: string = myArray[0];
```
**Typescript 支持两种索引签名：字符串和数字**

可以同时使用两种类型的索引，但是**数字索引的返回值必须是字符串索引返回值类型的子类型**。

这是因为当使用number来索引时，JavaScript 会将它转换成string然后再去索引对象。 也就是说用100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

```ts
class Animal{
  name : string
}
class Dog extends Animal{
  breed:string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay{
  [x:number]:Animal;
  [x:string]:Dog;
}
```
字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了obj.property和obj["property"]两种形式都可以。 下面的例子里，name的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：

interface NumberDictionary {
[index: string]: number;
  length: number; // 可以，length是number类型
  name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
}
但如果索引签名是包含属性类型的联合类型，那么使用不同类型的属性就是允许的。

```typescript
interface NumberOrStringDictionary {
   [index: string]: number | string;
   length: number;    // ok, length is a number
   name: string;      // ok, name is a string
}
```
最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：
```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
你不能设置myArray[2]，因为索引签名是只读的。
```


### ***类类型***
实现接口
与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约

```ts
interface ClockInterface{
  currentTime:Date;
}
class Clock implements ClockInterface{
  currentTime:Date = new Date();
  consturctor(h:number,m:number){}
}```

可以在接口里描述一个方法，在类里实现它，如下面的setTime 方法一样：

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

接口用来描述类的公共部分，而不是公共和私有部分，不会帮类检查是否有某些私有成员

#### ***类静态部分与实例部分的区别***

类有两个类型：
静态部分的类型和实例的类型
使用构造器签名去定义一个接口并试图定义一个类去实现这个接口时，会得到一个错误

**类实现接口，只对实例部分进行类型检查**
因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口，ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数createClock，它用传入的类型创建实例。
```ts
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

因为createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名。

另一种简单方式是使用类表达式：

```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
```

### 继承接口
和类一样 接口也可以相互继承
可以从一个接口里复制成员到另一个接口里
可以更灵活地将接口分割到可重用的模块里。
```ts
interface Shape{
  color:string;
}
interface Square extends Shape{
  sideLength:number;
}
let square = {} as Square;
square.color = "blue";
square.sideLength =10;
```


一个接口可以继承多个接口，创建出多个接口的合成接口。
```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### 混合类型

比如 一个对象可以同时作为函数和对象使用，并带有额外的属性
```ts
interface Counter{
  (start:number):string;
  interval:number;
  reset():void;
}
function getCounter():Counter{
  let counter = function(start:number){}as Counter;
  counter.interval = 123;
  counter.reset = function(){};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

在使用 JavaScript 第三方库的时候，你可能需要像上面那样去完整地定义类型。

### 接口继承类
接口继承类类型时，会继承类的成员但不包括其实现。


当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 private 和 protected 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 除了继承自基类，子类之间不必相关联。 例：

```ts
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

class ImageControl implements SelectableControl {
// Error: Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
//  Types have separate declarations of a private property 'state'.
  private state: any;
  select() {}
}
```
在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上，SelectableControl就像Control一样，并拥有一个select方法。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法）。而对于 ImageControl 类，它有自身的私有成员 state 而不是通过继承 Control 得来的，所以它不可以实现 SelectableControl 。


## 函数
函数是JavaScript应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 在TypeScript里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义_行为_的地方。 TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。


理解js函数闭包对学习ts有很大好处
```js
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };```

```ts
function add(x:number,y:number):number{
  return x + y;
}

let myAdd = function(x:number,y:number):number{
  return x+y
}

```
```ts
  let myAdd:(x:number,y:number)=>number =function(x:number,y:number):number{
    return x+y;
  }

```
### 推断类型
尝试这个例子的时候，你会注意到，就算仅在等式的一侧带有类型，TypeScript编译器仍可正确识别类型：


```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```
这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型
### 可选参数和默认参数
TypeScript里的每个函数参数都是必须的。 这不是指不能传递null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 
简短地说，
**传递给一个函数的参数个数必须与函数期望的参数个数一致**。
```ts
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right

```

JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用?实现可选参数的功能。 比如，我们想让last name是可选的：
```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```



**可选参数必须跟在必须参数后面**。 
如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"。
```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```
在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型


```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}
```
```ts
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```
参数也可以给定初始值，给定初始值的参数不需要跟在必须参数后面
与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入undefined值来获得默认值。 例如，我们重写最后一个例子，让firstName是带默认值的参数：

### 剩余参数
必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用arguments来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：
```ts
function buildName(fisrtName：string,...restOfName:string[]){
  return firstName + " " + restOfName.join(" ");

}


```

### this

JavaScript里，this的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

### 重载


## 字面量类型
### 介绍
一个字面量是一个集体类型中更为具体的一种子类型。意思是："Hello World" 是一个 string，但是一个 string 不是类型系统中的 "Hello World"。

目前 TypeScript 中有三种可用的字面量类型集合，分别是：字符串、数字和布尔值。通过使用字面量类型，你可以规定一个字符串、数字或布尔值必须含有的确定值。


### 字面量收窄
当你通过 var 或 let 来声明一个变量时，实际上你在告诉编译器这个变量中的内容有可能会被改变。与之相对地，用 const 来声明对象会让 TypeScript 知道这个对象永远不会被改变。
```ts
// We're making a guarantee that this variable
// helloWorld will never change, by using const.

// So, TypeScript sets the type to be "Hello World" not string
const helloWorld = "Hello World";

// On the other hand, a let can change, and so the compiler declares it a string
let hiWorld = "Hi World";
```

### 字符串字面量类型
字面量类型可以通过联合联系、类型守卫、类型别名来结合实际字符串值。通过这些特性，我们可以获取一种字符串并使其有类似枚举（enum）的行为。
```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy");
// Error: Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.```
你可以传递三种允许的字符串，但是如果传递其他的字符串会收到如下错误：

Argument of type '"uneasy"' is not assignable to parameter of type '"ease-in" | "ease-out" | "ease-in-out"'
字符串字面可以通过相同的方式用来分别重载：


function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
}
```

### 数字字面量类型

TypeScript 还有数字字面量类型，它的行为和上述字符串字面量类型相同。

```ts
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();
数字字面量类型经常用来描述配置值：


interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```
### 布尔字面量类型
TypeScript 还有布尔值字面量类型，你可以通过他们来约束某些属性之间互有关联的对象。

```ts
interface ValidationSuccess {
  isValid: true;
  reason: null;
};

interface ValidationFailure {
  isValid: false;
  reason: string;
};

type ValidationResult =
  | ValidationSuccess
  | ValidationFailure;
```

## 联合类型和交叉类型

### 介绍
交叉类型和联合类型是组合类型的方式之一。

### 联合类型
