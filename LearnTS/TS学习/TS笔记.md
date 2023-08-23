# TypeScript
js对传入参数错误没有限制
变量的声明
给标识符添加类型注解

变量的类型推导（推断）
//声明一个标识符时如果有直接赋值，会通过赋值类型进行推导
//let 进行类型推导，推导出来的是通用类型
//const 进行类型推导 推导出来的是字面量类型

ts中number不区分int和double 统一称为number

boolean类型 true false
字符串类型 单双引号 也支持模板字符串
数组类型
对象类型
symbol类型
null和undefined类型
既是自己的值也是自己的类型

//匿名函数是否需要添加类型注解呢？最好不要添加类型注解
上下文类型
函数执行上下文会自动确定参数和返回值的类型


对象类型

可选类型
```ts
type PointType = {
    x:number //这里分号，逗号，正确换行都可以
    y:number
    z?:number
}
function printCoordinate(point:PointType){
    console.log(point.x);
    console.log(point.y);
}

export{}
```



any类型
如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解，这个时候我们可以使用any:
口 包括在Vue源码中，也会使用到any来进行某些类型的适配
//any类型就表示不限制标识符的任意类型，并且可以在该标识符上面进行任意的操作，ts中回到了js


unknown类型
unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量
口和any类型有点类似，但是unknown类型的值上做任何事情都是不合法的;

要求我们必须进行类型校验（类型缩小）后才能进行对应的操作

void类型
void通常用来指定一个函数是没有返回值的

可以将undefined返回给void

当基于上下文的类型推导(Contextual Typing)推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容。


never类型
开发基本不用 某些情况会自动推导出never

开发框架（工具）可能会用到

封装一些类型工具的时候，可以使用never 
never 表示永远不会发生值的类型，比如一个函数:
口如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗?口不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型

元组类型tuple
//函数中使用元组最多,函数的返回值
可以明确知道对应位置上元素的类型


联合类型
ts类型系统允许我们使用多种运算符,从现有类型中构建新类型

类型别名
type

type和interface
那么它们有什么区别呢?
口 类型别名和接口非常相似，在定义对象类型时，大部分时候，你可以任意选择使用.口接口的几乎所有特性都可以在 type 中使用(后续我们还会学习interface的很多特性);


//interface可以被类实现（TS面向对象）
//区别一:type类型使用范围更广 接口只能用来声明对象

//区别二:在声明对象时,interface可以多次声明
//type不允许两个相同名称的别名同时存在
//interface支持继承
//interface可以被类实现（TS面向对象）
//如果是非对象类型的定义：type 如果是对象类型的声明那么用interface


交叉类型


类型断言as
有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言 (Type Assertions)
口比如我们通过 document.getElementByld,TypeScript只知道该函数会返回 HTMLElement，但并不知道它具体的类型:
TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，此规则可防止不可能的强制转换:
比如不能直接把age断言成string
const age :number = 18
const age2 = age as string //error
const age3 = age as any
const age4 = age3 as string //正确，但不推荐


非空类型断言
! 感叹号

字面量

字面量推理
```ts
const info= {
url:"http://111.com"
method:"GET"
}
function request (url:string.method:"GET"|"POST"){
console.log(url,method)
}

request(info.url,info.method)//info.method会报错，因为这里需要的是："GET"|"POST"类型，而传递的值是一个string类型,值为"GET"
```
```ts
//解决方法1：
request(info.url,info.method as "GET")
//解决方法2：
const info = {
    url:"http://111.com"
    method:"GET"
}as const 
```


类型缩小
什么是类型缩小呢?
口类型缩小的英文是 Type Narrowing (也有人翻译成类型收窄)
口我们可以通过类似于 typeof padding ==="number" 的判断语句，来改变TypeScript的执行路径口在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小( Narrowing )而我们编写的 typeof padding ==="number" 可以称之为 类型保护 (type guards);

常见的类型保护有如下几种:
口typeof
口 平等缩小(比如===、!==)
口instanceof
口in
口等等...

调用签名：
在JavaScript 中，函数除了可以被调用，自己也是可以有属性值的。
口然而前面讲到的函数类型表达式并不能支持声明属性
口如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名 (call signature)


构造签名

参数的可选类型
```ts
//3.ts中函数的重载写法
//3.1先编写重载签名
function add(num1: number, num2: number): number
function add(str1: string,str2:string):string

//3.2编写通用函数实现
function add(arg1: any, arg2: any) { 
    return arg1 + arg2;
}
add(10, 10)
add("abc", "def")
// add({ aaa: "aaa" }, 123)//err:没有与此调用匹配的重载

```
有实现体的函数是不能直接被调用的

可以使用联合类型的情况，尽量使用联合类型

ts中this默认是any

在开启nolmplicitThis的情况下，我们必须指定this的类型
如何指定呢?函数的第一个参数类型:
口函数的第一个参数我们可以根据该函数之后被调用的情况，用于声明this的类型(名词必须叫this)
口在后续调用函数传入参数时，从第二个参数开始传递的，this参数会在编译后被抹除

this相关的内置工具
//1.ThisParameterType:获取FooType类型中的this类型
//2.OmitOmitThisParameter:删除this参数类型，剩余的函数类型
//3.ThisType用于绑定一个上下文的this


TS面向对象


我们来定义一个Person类:
口使用class关键字来定义一个类
我们可以声明类的属性:在类的内部声明类的属性以及对应的类型
口如果类型没有声明，那么它们默认是any的;
口 我们也可以给属性设置初始化值;
口在默认的strictPropertylnitialization模式下面我们的属性是必须
初始化的，如果没有初始化，那么编译时就会报错;
√如果我们在strictPropertylnitialization模式下确实不希望给属性初始化，可以使用name!: string语法


类的继承
面向对象的其中一大特性就是继承，继承不仅仅可以减少我们的代码量，也是多态的使用前提
我们使用extends关键字来实现继承，子类中使用super来访问父类
我们来看一下Student类继承自Person:
口Student类可以有自己的属性和方法，并且会继承Person的属性和方法
口在构造函数中，我们可以通过super来调用父类的构造方法，对父类中的属性进行初始化;

类的成员修饰符
在TypeScript中，类的属性和方法支持三种修饰符: public、private、protected
口 public 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的;
口 private 修饰的是仅在同一类中可见、私有的属性或方法
口 protected 修饰的是仅在类自身及子类中可见、受保护的属性或方法