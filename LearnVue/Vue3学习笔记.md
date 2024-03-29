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

## **组件的通信**

父传子：props属性
子传父：$emit

### ***父传子：***

父组件： 
<ShowInfo name="脆脆鲨" age="20" height="1.70" ></ShowInfo>
子组件：props:['name','age','height'],//数组语法

props用于接收父组件传递的属性，可以在组件上注册一些自定义的attribute，父组件给attribute赋值，子组件通过attribute的名称获取到对应的值； 

什么是非Prop的Attribute呢?
当我们传递给一个组件某个属性，但是该属性并没有定义对应的props或者emits时，就称之为非Prop的Attribute;常见的包括class、style、id属性等;

会默认的添加到子组件的根元素上

inheritAttrs:false 禁用添加
$attrs.address 取非prop的attribute属性 
多个根时，可以用v-bind='$attrs'

### ***子传父：***

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

## **插槽Slot**

让使用者可以决定某一区域到底存放什么内容和元素

抽取共性 预留不同

插槽的默认内容

如果没有插入对应内容

### ***具名插槽：***

多个插槽时使用具名插槽 若没有名字则默认为default
父组件：

<template v-slot:left>
    <button>返回</button>
</template>

子组件：
  <slot name="left">left</slot>

### ***动态插槽名：***

通过v-slot:[dynamicSlotName]方式动态绑定一个名称

v-slot:可以缩写为#

### ***渲染作用域***

数据写在哪里即在哪里编译，所以数据是在当前渲染作用域下寻找
无法跨作用域寻找

### ***作用域插槽***

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

## **非父子通信-Provide和Inject的使用**

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

## **事件总线的基本使用**

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

## **生命周期**

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



## $refs的使用

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

## **动态组件**

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

## **Vue项目打包-webpack的分包处理**

默认的打包过程;
默认情况下，在构建整个组件树的过程中，因为组件和组件之间是通过模块化直接依赖的，那么webpack在打包时就会将组件模块打包到一起(比如一个app.js文件中);
这个时候随着项目的不断庞大，app.js文件的内容过大，会造成首屏的渲染速度变慢;
打包时，代码的分包:
所以，对于一些不需要立即使用的组件，我们可以单独对它们进行拆分，拆分成一些小的代码块chunk.js;这些chunk.js会在需要时从服务器加载下来，并且运行代码，显示对应的内容;

import函数可以让webpack对导入文件进行分包处理

import('./utils/math').then(res=>{
    res.sum(20,30)
})
//import返回的是一个Promise对象

如果我们的项目过大了，对于某些组件我们希望通过异步的方式来进行加载（目的是可以对其进行分包处理)，那么Vue中给我们提供了一个函数: defineAsyncComponent.
defineAsyncComponent接受两种类型的参数:
类型一:工厂函数，该工厂函数需要返回一个Promise对象;
类型二:接受一个对象类型，对异步函数进行配置;

对组件进行分包

import {defineAsyncComponent} from 'vue'

const AsyncComponent = defineAsyncComponent(()=>import('./views/Category.vue'))

## **组件的v-model**

前面我们在input中可以使用v-model来完成双向绑定:
这个时候往往会非常方便，因为v-model默认帮助我们完成了两件事;v-bind:value的数据绑定和@input的事件监听;
如果我们现在封装了一个组件，其他地方在使用这个组件时，是否也可以使用v-model来同时完成这两个功能呢?也是可以的，vue也支持在组件上使用v-model;

那么，为了我们的Mylnput组件可以正常的工作，这个组件内的<input>必须:将其value attribute绑定到一个名叫 modelValue 的 prop 上;
在其input事件被触发时，将新的值通过自定义的update:modelValue事件抛出;


modelValue是固定的 写死的


我们现在通过v-model是直接绑定了一个属性，如果我们希望绑定多个属性呢?也就是我们希望在一个组件上使用多个v-model是否可以实现呢?
我们知道，默认情况下的v-model其实是绑定了modelValue属性和@update:modelValue的事件;如果我们希望绑定更多，可以给v-model传入一个参数，那么这个参数的名称就是我们绑定属性的名称;注意:这里我是绑定了两个属性的
v-model:title相当于做了两件事:
<my-input v-model="message" v-model:title="title"/>
绑定了title属性;
监听了@update:title的事件;

## **认识Mixin**

目前我们是使用组件化的方式在开发整个Vue的应用程序，但是组件和组件之间有时候会存在相同的代码逻辑，我们希望对相同的代码逻辑进行抽取。
在Vue2和Vue3中都支持的一种方式就是使用Mixin来完成:
Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用功能;一个Mixin对象可以包含任何组件选项;
当组件使用Mixin对象时，所有Mixin对象的选项将被混合进入该组件本身的选项中;


Mixin的合并规则
如果Mixin对象中的选项和组件对象中的选项发生了冲突，那么Vue会如何操作呢?这里分成不同的情况来进行处理;
情况一:如果是data函数的返回值对象，返回值对象默认情况下会进行合并;
如果data返回值对象的属性发生了冲突，那么会保留组件自身的数据;
情况二:如何生命周期钩子函数
生命周期的钩子函数会被合并到数组中，都会被调用;
情况三:值为对象的选项，例如 methods、components和directives，将被合并为同一个对象,
比如都有methods选项，并且都定义了方法，那么它们都会生效;
但是如果对象的key相同，那么会取组件对象的键值对;

## **CompositionAPI**

主要围绕Setup函数的基本使用

相对应的是传统的Options API
export default{
    //Options API
    data(){
        return {counter:100}
    },
    props:{},
    components:{},
    methods:{
        changeCounter(){
            counter += 100;
        }
    },
    computed:{},
    watch:{
        counter(newValue,oldValue){}
    },
    created:{},
    mixins:{},
}
对counter的操作太散了

setup(){
    function userCounter(){
    const counter = ref(100)
    const doubleCounter = computed(()=>counter.value*2)
    const changeCounter =()=>{}
    watch()
    }
    useCounter()
}
在Vue2中，我们编写组件的方式是Options API:
Options API的一大特点就是在对应的属性中编写对应的功能模块;
比如data定义数据、methods中定义方法、computed中定义计算属性、 watch中监听属性改变，也包括生命周期钩子;但是这种代码有一个很大的弊端:
当我们实现某一个功能时，这个功能对应的代码逻辑会被拆分到各个属性中;
当我们组件变得更大、更复杂时，逻辑关注点的列表就会增长，那么同一个功能的逻辑就会被拆分的很分散;
尤其对于那些一开始没有编写这些组件的人来说，这个组件的代码是难以阅读和理解的（阅读组件的其他人);

## ***setup函数的参数***

我们先来研究一个setup函数的参数，它主要有两个参数:
第一个参数: props
第二个参数: context
props非常好理解，它其实就是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可以直接通过props参数获取:
对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义;并且在template中依然是可以正常去使用props中的属性，比如message;
如果我们在setup函数中想要使用props，那么不可以通过 this 去获取（后面我会讲到为什么)﹔因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可;
另外一个参数是context，我们也称之为是一个SetupContext，它里面包含三个属性:attrs:所有的非prop的attribute;
slots:父组件传递过来的插槽(这个在以渲染函数返回时会有作用，后面会讲到);
emit:当我们组件内部需要发出事件时会用到emit(因为我们不能访问this，所以不可以通过 this.$emit发出事件);

setup函数的返回值

setup中不可以使用this，因为会找不到实例，但其实是其源码中没有绑定this



## ***reactiveAPI***

reactive函数 定义复杂类型的数据
如果想为在setup中定义的数据提供响应式的特性，那么我们可以使用reactive的函数;
const state =  reactive({
    name :  "coderwhy" ,
    counter: 100
})

那么这是什么原因呢?为什么就可以变成响应式的呢?
这是因为当我们使用reactive函数处理我们的数据之后，数据再次被使用时就会进行依赖收集;
当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作（比如更新界面);
事实上，我们编写的data选项，也是在内部交给了reactive函数将其编程响应式对象的;

reactive被解构后会变成普通的值

## ***Ref API***

reactive API对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型:如果我们传入一个基本数据类型(String、Number、Boolean）会报一个警告;
value cannot be made reactive: Hello world
这个时候Vue3给我们提供了另外一个API: ref API
ref 会返回一个**可变的响应式对象**，该对象作为一个响应式的引用维护着它内部的值，这就是ref名称的来源;它内部的值是在ref的value属性中被维护的;
const message = ref( "Hello World");
这里有两个注意事项:
在模板中引入ref的值时，Vue会自动帮助我们进行解包操作，所以我们并不需要在模板中通过ref.value的方式来使用;
但是在setup 函数内部，它依然是一个ref引用，所以对其进行操作时，我们依然需要使用ref.value的方式;


ref是浅层解包
const info = {
    counter 
}

template中使用时不需要写.value 修改时需要些.value vue目前不一致的地方

## ***readonly***

单向数据流
我们通过reactive或者ref可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方(组件)的这个响应式对象希望在另外一个地方(组件)被使用，但是不能被修改，这个时候如何防止这种情况的出现呢?
口 Vue3为我们提供了readonly的方法
口 readonly会返回原始对象的只读代理(也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不能对其进行修改

口readonly返回的对象都是不允许修改的;
口但是经过readonly处理的原来的对象是允许被修改的;
√比如 const info = readonly(obj)，info对象是不允许被修改的当obj被修改时，
readonly返回的info对象也会被修改;
√ 但是我们不能去修改readonly返回的对象info


本质上就是readlonly返回的对象的setter方法被劫持了而已
 
isProxy 检查对象是否由reactive或readonly创建的proxy
isReactive 检查对象是否是由reactive创建的响应式代理
如果该代理是由readonly创建的，但包裹了由reactive创建的另一个代理，也会返回true
返回
isReadOnly
toRaw
shallowReactive 
创建一个响应式代理，跟踪其自身property的响应性，但不执行嵌套对象的深层响应式
shallowReadOnly


## ***toRefs***

reactive被解构后会变成普通的值，失去响应式
const {name,age} = toRefs(name,age)

ref中其他的API

unref
如果我们想要获取一个ref引用中的value，那么也可以通过unref方法口 如果参数是一个 ref，则返回内部值，否则返回参数本身口这是 val = isRef(val) ? val.value : val 的语法糖函数
isRef
口 判断值是否是一个ref对象
shallowRef
口创建一个浅层的ref对象

triggerRef
口 手动触发和 shallowRef 相关联的副作用

## ***computed的函数使用***

返回的也是ref


## ***setup中使用ref以及生命周期***

setup函数中，注册别的生命周期函数，直接使用导入的onX函数注册的生命周期钩子
onMounted
可以注册多个
没有beforeCreate  created  直接在setup中操作
setup围绕beforeCreate  created生命周期钩子运行，所以不需要显式地定义他们

## ***Provide和Inject***

共享的是ref 父组件改变数据 子组件也会改变

## ***watch侦听数据的变化***
```javascript
import {ref,watch} from 'vue'
export default{
    setup(){

    }
}
const message = ref("hello world")
watch(message,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
})
watch(()=>message,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
})
watch(()=>({...message}),(newValue,oldValue)=>{
    console.log(newValue,oldValue)
})
return {
    message
}
()=>message 以函数形式进行监听会对依赖进行收集
()=>({...message})将proxy对象改为普通对象
```
    
## ***watchEffect收集数据***

watchEffect传入的函数会默认被执行
执行的过程中，会自动的收集依赖（依赖哪些响应式数据）
只有收集的依赖变化时，函数才会再次执行

停止监听：stopWatch()

## ***setup语法糖***
setup语法糖的顶层的绑定，会暴漏给模板

## defineProps()和 defineEmits()
为了在声明 props 和emits 选项时获得完整的类型推断支持，我们可以使用 defineProps 和 defineEmits APl，它们将自动地在 <script setup>中可用

## defineExpose()
子组件实例暴露出去，父组件ref引用

## VueRouter
前端路由
路由其实是网络工程中的一个术语:
口在架构一个网络时，非常重要的两个设备就是路由器和交换机
口 当然，目前在我们生活中路由器也是越来越被大家所熟知，因为我们生活中都会用到路由器
口事实上，路由器主要维护的是一个映射表;
口 映射表会决定数据的流向;

前端路由是如何做到URL和内容进行映射呢? 监听URL的改变
URL的hash
口 URL的hash也就是锚点(#),本质上是改变window.location的href属性口我们可以通过直接赋值location.hash来改变href; 但是页面不发生刷新



## Pinia

### mutation重要原则
一条重要的原则就是要记住 mutation 必须是同步函数
口 这是因为devtool工具会记录mutation的日记
口每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照
口但是在mutation中执行异步操作，就无法追踪到数据的变化

### actions的基本使用

Action类似于mutation，不同在于:
口Action提交的是mutation，而不是直接变更状态口Action可以包含任意异步操作:

 这里有一个非常重要的参数context:
口 context是一个和store实例均有相同方法和属性的context对象;
口所以我们可以从其中获取到commit方法来提交一个mutation，或者通过context,state 和 context.getters 来获取 state和getters;
但是为什么它不是store对象呢? 这个等到我们讲Modules时再具体来说;

组件内通过dispatch派发action
action内通过context.commit 提交mutation
```js
this.$store.dispatch("changeNameAction,"aaa)
```


**数据管理方式**


1.从服务器请求拿到的数据，在对应的页面组件中进行维护
discover.vue里面统一进行网络请求
然后通过ref传递给子组件
const banner = ref([])
const recommend = ref([])
const ranking = ref([])

2.一个页面中的组件数据，抽到
Vuex中管理store->state ={
    banner:[],
    recommend:[],
    ranking:[]
}




### module的基本使用
核心：抽离
1.使用state时 需要state.moduleName.xxx
{{$store.state.counter.count}}
2.使用getters时，是直接getters.xxx
{{$store.getters.doubleCount}}

#### module的命名空间
默认情况下，模块内部的action和mutation任然是注册在全局的命名空间中，这样使得多个模块可以同时对一个action或mutation作出响应；
Getter同样也默认注册在全局命名空间；

如果我们希望模块具有更高的封装度和复用性，可以添加 **namespaced: true** 的方式使其成为带命名空间的模块:
当模块被注册后，它的所有 getter、action 及mutation 都会自动根据模块注册的路径调整命名;


加上命名空间以后，getter使用：
{{$store.getters["counter/doubleCount"]}}

module修改根组件：
changeNameAction({commit,dispatch,state,rootState,getters,rootGetters}){
    commit("changeName","kobe");
    commit("changeRootName",null,{root:true});
    dispatch("changeRootNameAction",
    null,{root:true})
}


### Pinia状态管理

#### Pinia和VueX对比

那么我们不是已经有Vuex了吗?为什么还要用Pinia呢?
口 Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法
口 最终，团队意识到Pinia已经实现了Vuex5中大部分内容，所以最终决定用Pinia来替代Vuex;口与Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的仪式，提供了 Composition-API 风格的API;口 最重要的是，在与 Typescript 一起使用时具有可靠的类型推断支持

和Vuex相比，Pinia有很多的优势:
口比如mutations不再存在
√他们经常被认为是非常冗长
他们最初带来了devtools 集成，但这不再是问题:口 更友好的TypeScript支持，Vuex之前对TS的支持很不友好;
口 不再有modules的嵌套结构:
你可以灵活使用每一个store，它们是通过扁平化的方式来相互使用的
口 也不再有命名空间的概念，不需要记住它们的复杂关系;

index.js入口文件
```js
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia 

```

在main.js 中use(pinia)

counter.js
```js
//定义关于counter的store
import { defineStore } from 'pinia'

//第一个参数为id，第二个为对象，是要存的东西
const useCounter = defineStore("counter",{
    state()=>({
        count:99
    })
})

// const countStore = useCounter()

export default useCounter

```

Home.vue
```js
<template>
    <div class="home">
        <h2>Home View</h2>
        <h2> 
            count:{{counterStore.count}}
        </h2>
    </div>
</template>    
<script setup>
import useCounter from '@/stores/counter';

const counterStore = useCounter()

</script>    


```
#### 什么是Store?
口一个store (如 Pinia)是一个实体，它会持有为绑定到你组件树的状态和业务逻辑，也就是保存了全局的状态口
口它有点像始终存在，并且每个人都可以读取和写入的组件;
口 你可以在你的应用程序中定义任意数量的store来管理你的状态
store有三个核心概念:
口state、getters、actions ;
等同于组件的data、computed、methods;
口一旦 store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性.


pinia组件内 拿到store里面的数据，直接进行修改
``{storeToRefs}``将数据变为响应式
注意Store获取到后不能被解构，那么会失去响应式:
口为了从 Store 中提取属性同时保持其响应式，您需要使用``storeToRefs``


通过
```userStore.$patch({})```传入对象，可以进行一次性修改
多个状态
``$state ``替换state为新的对象


### Getters

相当于computed 假如一些数据需要转化后使用的话，就是用getters

一个getter引入另外一个getter

this是store实例

也支持返回一个函数

getter中如果用到别的store中的数据
直接import引入对应的use函数然后使用就可以

#### actions   
用来定义方法
和getters一样，在action中可以通过this访问整个store实例的所有操作



### Pinia持久化存储

pinia可以将 store 中的数据保存在本地存储中，以便在页面刷新后仍然可以访问
piniaPluginPersistedstate插件实现

安装 pinia-plugin-persistedstate 插件

bash复制代码npm i pinia-plugin-persistedstate
#或者使用 npm
yarn add pinia-plugin-persistedstate


安装完成后 需要在main.ts/js文件内进行配置

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
++ import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
++ pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')

```

引入了piniaPluginPersistedstate   并且使用app.use()传递给了应用程序。
3.最后再store里面添加配置选项
```js
import { ref, computed } from "vue";
import { defineStore } from "pinia";


// 选项式写法
// export const useCounterStore = defineStore(
//   "counter",

//   {
//     state: () => ({ count: 0 }),
//     // state: () => {
//     //   return { count: 0 }
//     // },
//     // 也可以这样定义
//     // state: () => ({ count: 0 })
++//     persist: true,
//     actions: {
//       increment() {
//         this.count++;
//       },
//     },
//   }
// );

// 组合式写法 
export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const increment =()=> {
      count.value++;
    }
    return {
      count,
      increment
    };
  },
  {
++    persist: true,
  },

);
``

