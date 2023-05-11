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


**组件的通信**

父传子：props属性
子传父：$emit

***父传子：***
父组件： 
<ShowInfo name="脆脆鲨" age="18" height="1.88"></ShowInfo>
子组件：props:['name','age','height'],//数组语法

props用于接收父组件传递的属性，可以在组件上注册一些自定义的attribute，父组件给attribute赋值，子组件通过attribute的名称获取到对应的值； 

什么是非Prop的Attribute呢?
当我们传递给一个组件某个属性，但是该属性并没有定义对应的props或者emits时，就称之为非Prop的Attribute;常见的包括class、style、id属性等;

会默认的添加到子组件的根元素上

inheritAttrs:false 禁用添加
$attrs.address 取非prop的attribute属性 
多个根时，可以用v-bind='$attrs'

***子传父：***
子组件内有事件发生，父组件需要切换内容
子组件给父组件传递内容

this.$emit('add', count)
第一个参数是自定义的事件名称
第二个参数是传递的参数

optionsAPI  
emits: ['add'] 数组语法
对象语法：进行自定义事件的参数验证
    emits:{
    add(count){
        if (count<10){
            return true
        }
    }
},


**插槽Slot**

让使用者可以决定某一区域到底存放什么内容和元素

抽取共性 预留不同

插槽的默认内容

如果没有插入对应内容

***具名插槽：***
多个插槽时使用具名插槽 若没有名字则默认为default
父组件：
<template v-slot:left>
    <button>返回</button>
</template>

子组件：
  <slot name="left">left</slot>

***动态插槽名：***
通过v-slot:[dynamicSlotName]方式动态绑定一个名称

v-slot:可以缩写为#

***渲染作用域***

数据写在哪里即在哪里编译，所以数据是在当前渲染作用域下寻找
无法跨作用域寻找

***作用域插槽***
子组件slot标签内用v-bind绑定属性
父组件v-slot:defalut="props"

子组件：
<slot :item="item">
        <span>{{ item }}</span>
</slot>

父组件：
<template #default="props">
<button>{{ props.item }}</button>
</template>

独占默认插槽的简写：
<template v-slot:defult="props"></template>
简写为：
<template v-slot="props"></template>
template的作用：找到defult以及props绑定的数据
假如只有一个插槽 可以不写template

如果有默认插槽和具名插槽 按照完整的template来写


**非父子通信-Provide和Inject的使用**

Provide/Inject用于非父子组件之间共享数据:
比如有一些深度嵌套的组件，子组件想要获取父组件的部分内容;
在这种情况下，如果我们仍然将props沿着组件链逐级传递下去，就会非常的麻烦;
一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

对于这种情况下，我们可以使用Provide和 Inject :
无论层级结构有多深，父组件都可以作为其所有子组件的依赖
提供者;
父组件有一个provide选项来提供数据;
子组件有一个inject选项来开始使用这些数据;

父组件不知道哪些子组件用了 子组件不知道inject的property来自哪里


如果Provide中提供的一些数据是来自data，那么我们可能会想要通过this来获取 
data(){
    return{
        message:'脆脆鲨真帅'
    }
},
provide(){
    return{
    name:'Why',
    age:'18',
    message:this.message
    }
}

如果是对象写法 this绑定错误 即会失效

我们先来验证一个结果:如果我们修改了this.names的内容，那么使用length的子组件会不会是响应式的?我们会发现对应的子组件中是没有反应的:
这是因为当我们修改了names之后，之前在provide中引入的this.names.length本身并不是响应式的;那么怎么样可以让我们的数据变成响应式的呢?
非常的简单，我们可以使用响应式的一些API来完成这些功能，比如说computed函数;
当然，这个computed是vue3的新特性
注意:我们在使用length的时候需要获取其中的value
这是因为computed返回的是一个ref对象，需要取出其中的value来使用;

**事件总线的基本使用**

event-bus 

App.vue
  created() {
        //事件监听
        eventBus.on('whyEvent', (name, age, height) => {
            console.log('whyEvent事件在app中监听', name, age, height);
            this.message = `name: ${name},age: ${age},height: ${height}`;
        })
    }

HomeBanner.vue
methods: {
        bannerClick() {
            console.log('bannerClick');
            eventBus.emit('whyEvent', 'why', 18, 1.88)
        }
    }



//移除监听
Category.vue
  methods:{
        whyEventHandler(){
            console.log('whyEvent在category中被监听');

        }
    },
    created(){
        eventBus.on('whyEvent', this.whyEventHandler)
    },
    unmounted(){
        console.log('category unmounted');
        eventBus.off('whyEvent',this.whyEventHandler)
    }

生命周期 组件中ref的引用 动态组件的使用 keep-alive组件 异步组件的引用

组件的v-model 组件的混入Mixin


**生命周期**

什么是生命周期呢?
  生物学上，生物生命周期指得是一个生物体在生命开始到结束周而复始所历经的一系列变化过程;每个组件都可能会经历从创建、挂载、更新、卸载等一系列的过程;
  在这个过程中的某一个阶段，我们可能会想要添加一些属于自己的代码逻辑（比如组件创建完后就请求一些服务器数据);
  但是我们如何可以知道目前组件正在哪一个过程呢? Vue给我们提供了组件的生命周期函数;

生命周期函数:
 生命周期函数是一些钩子函数(回调函数)，在某个时间会被Vue源码内部进行回调;通过对生命周期函数的回调，我们可以知道目前组件正在经历什么阶段;
 那么我们就可以在该生命周期中编写属于自己的逻辑代码了;
 
 created发送网络请求 事件监听 this.$watch
 mounted 元素已经被挂载 获取DOM使用DOM
 unmounted 回收操作 取消事件监听



$refs的使用

某些情况下，我们在组件中想要直接获取到元素对象或者子组件实例:在Vue开发中我们是不推荐进行原生DOM操作的;
这个时候，我们可以给元素或者组件绑定一个ref的attribute属性;
<h2 ref="title" class="title" :style="{color:titleColor}">Hello {{message}}</h2>
        <button ref="btn" @click="changeMessage">changeMessage</button>
    
methods:{
        changeMessage(){
         /*    this.message = '脆脆鲨超级无极大帅哥',
            this.titleColor = 'blue' */
            console.log(this.$refs.title);
            console.log(this.$refs.btn);
        }
    }

也可以获取组件实例
获取到的是四个不同的instance实例
由同一个模板创建（export default）
this.$ref.banner
this.$ref.banner
this.$ref.banner
this.$ref.banner

vue用对象的形式实现类 

在父组件中可以调用子组件的对象方法
this.$ref.banner.bannerClick()

获取banner中的元素
this.$ref.banner.$el

vue2不允许有多个根 vue3支持
多个根时
this.$ref.banner.$el 获取到的是第一个node节点

this.$ref.banner.$el.nextElementSibling


组件实例还有两个属性：

this.$parent获取父组件
this.$root 获取根组件
vue3已经移除了$children

**动态组件**

动态组件是使用component组件，通过一个特殊的attribute is 来实现:
<component is='Home'></component>
is中的组件需要来自两个地方
1.全局注册的组件
2.局部注册的组件

<component :is='tabs[currentIndex]'></component>

***动态组件传递数据***

同正常组件传参
写在component标签内

**keep-alive**
来回创建销毁组件性能消耗太高
<keep-alive></keep-alive>
将组件缓存起来
<keep-alive include="home,about"></keep-alive>
组件的名称来自组件定义的时的name属性
子组件内部
name:"home"


keep-alive有一些属性:
include - string | RegExp | Array。只有名称匹配的组件会被缓存;exclude - string | RegExp | Array。任何名称匹配的组件都不会被缓存;max - number | string。最多可以缓存多少组件实例，一旦达到这个数字，那么缓存组件中最近没有被访问的实例会被销毁;
include和exclude prop 允许组件有条件地缓存:
二者都可以用逗号分隔字符串、正则表达式或一个数组来表示;匹配首先检查组件自身的name选项;


缓存的生命周期
对于保持keep-alive的组件 监听有没有进行切换
keep-alive 组件进入活跃状态
activated(){}

离开
deactivated{}
