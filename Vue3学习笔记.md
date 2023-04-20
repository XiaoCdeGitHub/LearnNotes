# Vue3学习笔记

## 创建app 

传入一个对象

```
 const app = Vue.createApp({

​    template:`<h1>hello 脆脆鲨</h1>`

  })
```

## 挂载app 

```js
 app.mount('#app')
```

```html
<div id="app"></div>
```



## data属性

data属性必须是函数，内部返回一个对象，对象的属性都可以通过插值语法

声明式开发

## methods对象

template假如没有写东西的话 会默认渲染id绑定的div 如果有则会覆盖



MVVM模型

MVC  Model-View-Controller  

MVVM Model-View-ViewModel 

data

Vue3必须传入一个函数

data中返回的数据被Vue响应式系统劫持 ，之后对该对象的修改或者访问都会在劫持中被处理：

![image-20230324172153308](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230324172153308.png)

Vue2 方式一  Vue3方式二

**methods内不应该使用箭头函数**

methods只是个对象类型 没有作用域

其内部箭头函数指向全局作用域

plus:()=>{}

因为箭头函数绑定了父级作用域的上下文，无法将this正确的绑定到期望指向的组件实例。

this.a 会是undefined

methods函数内this指向

## Vue指令

### Mustache语法   

大胡子语法/插值语法

{{}}

其中可以调用函数 ，表达式，三元运算符

不可以写赋值语句

### v-once 只渲染一次 

![image-20230328215956173](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230328215956173.png)

### v-text

用于更新元素的textcentent

### v-pre

跳过编译过程

### v-cloak

可以使用 v-cloak 指令设置样式，这些样式会在 Vue 实例编译结束时，从绑定的 HTML 元素上被移除。

当网络较慢，网页还在加载 Vue.js ，而导致 Vue 来不及渲染，这时页面就会显示出 Vue 源代码。我们可以使用 v-cloak 指令来解决这一问题。
```html：

<div id="app" v-cloak>
    {{context}}
</div>


css：

[v-cloak]{
    display: none;
}

<script>
    var app = new Vue({
        el: '#app',
        data: {
            context:'互联网头部玩家钟爱的健身项目'
        }
    });
</script>
```
在简单项目中，使用 v-cloak 指令是**解决屏幕闪动**的好方法。但在大型、工程化的项目中（webpack、vue-router）只有一个空的 div 元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 v-cloak 指令咯。

### v-memo 

做性能优化的 只有监听的属性改变，才会重新渲染。

### **v-bind** 

绑定基本属性
传递属性
  例如a标签herf属性 img src属性
缩写： ：

绑定全局属性
class 对象语法 数组语法
style 对象语法 数组语法
对象内无法解析小短杠
要么加单引号 要么写驼峰

css property名可以用驼峰式(camelCase)或短横线分隔(kebab-case，记得用引号括起来)来命名;

直接绑定对象，给组件传递参数

### v-on

绑定事件参数
在绑定事件的时候，没有传递任何的参数，那么event对象会被默认传递进来

在模版中想要明确获取event对象：
$event

v-on的修饰符

在div里面绑定点击事件会发生冒泡

.stop 修饰符 调用event.stopPropagation() 阻止冒泡阻止冒泡   
.prevent 修饰符 调用event.preventDefault() 阻止默认行为
.capture 添加事件监听器时使用capture模式
.once 只触发一次回调
.left 点击鼠标左键触发
.right
.middle

### 条件渲染

v-if v-else v-if-else 
v-show

空对象转换成bool类型依然是true
Object.keys(info).length

v-if是惰性的
当判断条件内容为空时 会直接不渲染或者直接销毁

### template元素

模版
目的是为了将整块逻辑包裹在一起 可以当做不可见的包裹元素 并且在v-if上使用，但是最终template不会被渲染出来
有点类似小程序中的block

### v-show 和v-if的区别

v-show不支持template 因为v-show本质是通过改变display：none 来控制的 template不渲染 所以不可以一起用
v-show不可以和v-else一块用

如果元素需要在显示和隐藏之间频繁切换的话 使用v-show 
不会发生频繁切换 使用v-if  v-if会触发回流和重绘

### v-for 

对一组数据进行遍历和迭代

#### v-for基本使用

item in 数组
item是别名 可以自定义 数组通常是来自data或者prop
如果需要拿到索引值
那就 (item,index)in数组

遍历数组

遍历对象支持 value,key,index 三个参数 默认是value

遍历字符串
字符串也是可迭代对象 iterable

遍历数字
v-for="item in 10" 

如果没有实际的意义，可以用template替换

数组更新的检测
push pop shift unshift sort splice reverse 

不修改原数组的方法是不能侦听的

#### v-for中key的作用

key属性主要用在Vue的虚拟DOM算法，在新旧nodes对比辨识VNodes；
如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法；
而使用key，它会基于key的变化重新排列元素顺序，并且会移除/销毁key不存在的元素；


key要求是唯一：id

VNode 虚拟节点 Virtual Node 本质是一个js对象

虚拟DOM  VNode 会形成一个VNode Tree
虚拟DOM 跨平台性

### v-model

实现双向绑定 

常用于表单提交

语法糖的写法  内部等价于

```html
<input type="text"
:value="message" 
@input="inputChange = $event.target.value">
```

v-model绑定checkbox

单选框绑定到属性中的值是一个Boolean类型的值单选value没有意义

```html
<label for="agree">

    ​      <input id="agree" type="checkbox" v-model="isAgree">同意协议

    ​    </label>
```

for和id的值一样 点击文本内容也可以选中



多选框中绑定到属性中的值,是数组必须明确的,绑定一个value值

v-model绑定radio

同一个表单 如果name相同 则会互斥

v-model绑定select

multiple多选对应数组类型

```html
<!-- select多选 -->
        <select v-model="fruits" multiple size="2">
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
            <option value="grape">葡萄</option>
        </select>
        <h2>多选：{{fruits}}</h2>
```

v-model的值绑定 渲染数据

v-model修饰符 -lazy

v-model默认绑定的是input事件

加上lazy修饰符就变成change事件

v-model修饰符 -number

自动将我们的内容转换成数字

v-model修饰符 -trim

去除内容首尾的空格







## OptionsAPI 

### Vue的computed

在模板中放入太多的逻辑，会让模板过重 难以维护

1.可以通过methods抽离
2.可以通过计算属性computed

对于任何包含响应式数据的复杂逻辑，都应该使用计算属性
this访问数据
计算属性默认对应的是一个函数

计算属性和methods最大的区别是 computed是有缓存的

计算属性的getter和setter

### 认识侦听器watch

希望在代码的逻辑中监听到代码逻辑的变化

watch回调函数默认有两个参数
newValue oldValue
对象的话这两个参数拿到的是代理对象获取原始对象
{...newValue} 这是另外一个对象
Vue.toRaw 表示原始的 未经加工的 
Vue.toRaw(newValue)

watch的配置选项
默认watch不会进行深度监听
template是深度监听

deep:true 监听器配置选项

第一次渲染直接执行一次监听器
immediate:true
另外一种写法：

 ```'info.name'(newValue,oldValue){
                console.log('info变化啦',newValue,oldValue);
            }
 ```


另外一种监听方法:

生命周期的回调函数
created 当前组件被创建时自动执行
一般在该函数中 会进行网络请求 
```
this.$watch(expOrFn, callback, { options })     

},
  this.$watch('message', (newValue, oldValue) => {
                console.log(newValue, oldValue);
            }, { deep: true })
```



综合案例
border-collapse CSS 属性是用来决定表格的边框是分开的还是合并的。在分隔模式下，相邻的单元格都拥有独立的边框。在合并模式下，相邻单元格共享边框

高阶函数 reduce 
reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。
```
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10
```

按钮禁用：disable

## 组件化开发基础-脚手架

createApp函数传入了一个对象App，这个对象其实本质上就是一个组件，也是我们应用程序的根组件

一个个独立可复用的小组件来构造我们的应用，

任何应用都会被抽象成一颗组件树

组件的注册：全局组件 局部组件

组件的名称：

方式一：kebab-case 短横线分隔符

方式二：使用PascalCase 大驼峰命名

全局组件的特点：

注册成功后 可以在任意组件的template内使用



注册局部组件：

## Vue CLI脚手架

Command-Line Interface 命令行页面

内置了webpack相关配置

Vue CLI的安装和使用

脚手架本身也是一个npm的包

npm install @vue/cli -g

.browserslistrc  进行浏览器适配   
市场占有率 版本

postcss 转换css新特性

 jsconfig.json 给vscode用的  给我们更好的代码提示

vue.config.js 配置webpack

.vue文件由vue-loader加载
template->createVnode 
