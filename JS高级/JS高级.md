JS编译顺序

1.代码被解析，v8引擎会帮助我们创建一个对象，（GlobalObject -> go)  发生在源代码转换为AST抽象语法树的过程中![image-20230322141528601](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230322141528601.png)

其中包含了String Date setTimeout 函数 window对象（指向Globalobject) 以及需要被解析的js代码的属性，但此时所有属性值都为undefined

2.运行代码

2.1为了执行代码，v8引擎内部会有一个执行上下文栈（函数调用栈） Execution Context Stack 

2.2 因为我们执行的是全局代码，为了全局代码能够正常的执行，需要创建 全局执行上下文 （全局代码需要被执行时，也会创建）Global Execution Context 

全局执行上下文内维护了 VO（variable Object ） 指向GO

![image-20230322141633462](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230322141633462.png)

当我们查找一个变量时，真实的查找路径是沿着作用域链来查找

![image-20230322152029318](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230322152029318.png)从



内存泄漏
垃圾回收机制

JS中函数是一等公民
JAVA对象是一等公民

JS语法函数内部再定义函数

JS中闭包

这里先来看一下闭包的定义，分成两个∶
在计算机科学中和在JavaScript中。
在计算机科学中对闭包的定义（维基百科）
闭包（英语:Closure )，又称词法闭包(Lexical Closure )或函数闭包( function closures ) ;是在支持头等函数的编程语言中，实现词法绑定的一种技术;
闭包在实现上是一个结构体，它存储了一个函数和一个关联的环境（相当于一个符号查找表）;
闭包跟函数最大的区别在于，当捕捉闭包的时候，它的自由变量会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行;

我们再来看一下MDN对JavaScripti闭包的解释︰
一个函数和对其周围状态(（ lexical environment，词法环境)的引用捆绑在一起(或者说函数被引用包围），这样的组合就是闭包( closure ) ;也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域;
在JavaScript中，每当创建一个函数，闭包就会在函数创建的同时被创建出来;

函数解析:上层作用域 代码执行体


闭包的内存泄漏

正常情况执行上下文被销毁的时候 对应的属于他的AO对象也会被销毁


堆的函数对象里：上层作用域 函数执行体

清除闭包的内存泄漏：
很简单 将函数的指向改为null
foo = null
fn = null