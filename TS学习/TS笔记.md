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
