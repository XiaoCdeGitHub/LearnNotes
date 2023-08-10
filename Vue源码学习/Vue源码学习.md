# Vue源码学习
## 前置知识

### Proxy


```js
const proxy = new Proxy(target,handle)
``


``js

const origin  = {}
const obj = new Proxy(origin,{
gee:function (target,propKey,receiver){
    return '10'
}
})

```

## Object的变化侦测
### 使Object数据变得“可观测”

```js
//定义Observer类，用来将一个正常的object转换成可观测的object。并且给value新增一个_ob_属性，值是该value的observer实例。这个操作相当于为value打上标记，表示已经被转化成响应式，避免重复操作。
export class Observer {
    constructor(value){
        this.value = value
        def(value,'_ob_',this)
        if(Array.isArray(value)){
            //...
        }
        else{
            this.walk(value)
        }
    }
}

walk(obj:Object){
    const keys = Object.keys(obj)
    for(let i = 0; i<keys.length;i++){
        defineReactive(obj,keys[i])
    }
}
function defineReactive (obj,key,val){
    if(argumenets.length === 2){
        val = obj[key]
    }
    if(tyoeof val === 'object'){
        new Obeserver(val)
    }
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get(){
            console.log(`${key}属性被读取了`);
            return val;
        },
        set(newVal){
            if(val === newVal){
                return
            }
            console.log(`${key}属性被修改了`);
            val = newVal;
        }
    })
}

```
在上面的代码中，我们定义了observer类，它用来将一个正常的object转换成可观测的object。

并且给value新增一个__ob__属性，值为该value的Observer实例。这个操作相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作

然后判断数据的类型，只有object类型的数据才会调用walk将每一个属性转换成getter/setter的形式来侦测变化。 最后，在defineReactive中当传入的属性值还是一个object时使用new observer（val）来递归子属性，这样我们就可以把obj中的所有属性（包括子属性）都转换成getter/seter的形式来侦测变化。 也就是说，只要我们将一个object传到observer中，那么这个object就会变成可观测的、响应式的object。

observer类位于源码的src/core/observer/index.js中。

### 依赖收集
观测到数据变化后，要通知视图进行更新，但是全部更新不合理，所以谁用到了这个数据就更新谁
给每个数据都创建一个依赖数组。


在getter中收集依赖，在setter中通知依赖更新

单用数组存放依赖过于耦合，应该进行一个拓展，建立一个依赖管理器。
依赖管理器Dep类
```js
export default class Dep{
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    removeSub(sub){
        remove(this.subs,sub)
    }
    depend(){
        if(window.target){
            this.addSub(window.target)
        }
    }
    notify(){
        const subs = this.subs.splice()
        for(let i = 0 ,l=subs.length;i<l;i++){
            subs[i].update()
        }
    }

    export function remove(arr,item){
        if(arr.length){
            const index = arr.indexOf(item)
        }
        if(index >-1){
            return arr.splice(index,1)
        }
    }

}




```
在上面的依赖管理器Dep类中，我们先初始化了一个subs数组，用来存放依赖，并且定义了几个实例方法用来对依赖进行添加，删除，通知等操作。

有了依赖管理器后，我们就可以在getter中收集依赖，在setter中通知依赖更新了，代码如下：

```js


function defineReactive (obj,key,val) {
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
    new Observer(val)
  }
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      dep.depend()    // 在getter中收集依赖
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      val = newVal;
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}

```

在上述代码中，我们在getter中调用了dep.depend()方法收集依赖，在setter中调用dep.notify()方法通知所有依赖更新


谁用到了数据，谁就是依赖，我们就为谁创建一个Watch实例，在之后数据变化后，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例，由Watch实例去通知真正的视图

```js
export default class Watch{
    constructor(vm,expOrFn,cb){
        this.vm = vm;
        this.cb = cb;
        this.getter = parsePath(expOrFn)
        this.value = this.get()
    }
    get(){
        window.target = this;
        const vm = this.vm;
        let value = this.getter.call(vm,vm)
        window.target = undefined;
        return value
    }
    update(){
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.bm,this.value,oldValue)
    }
}
/**
*Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^\w.$]/
export function parsePath(path){
    if(bailRE.test(path)){
        return 
    }
    const segments = path.split('.')
    return function (obj){
        for(let i = 0;i<segments.length;i++){
            if(!obj)return
            obj = obj[segments[i]]
    }
    return obj
}

```








