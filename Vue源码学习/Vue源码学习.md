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

``