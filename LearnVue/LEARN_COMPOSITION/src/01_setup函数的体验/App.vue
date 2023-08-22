<template>
  <div class="app">
    我是app组件
    <!-- template中ref对象自动解包 -->
    <h2>当前计数{{  counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import {ref} from 'vue'
import useCounter from '../01_setup函数的体验/hooks/useCounter'

export default {
 setup(){
  // 默认定义的数据不是响应式数据
 /*  let counter =ref(100)
  const increment = () =>{
    counter.value++
  }
  const decrement = () =>{
    counter.value--
  } */

  // const {counter,increment,decrement} = useCounter()
  // return {
  //   counter,
  //   increment,
  //   decrement
  // }
  return {
  ...useCounter()
  }

 }
}
</script>

<style>
#app {

}
</style>
