<template>
        <h2>Home计数:{{ counter }}</h2>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <button @click="popularClick">流行</button>
        <button @click="hotClick">热门</button>
        <button @click="songClick">歌单</button>
        <h2>x:{{scrollPosition.x}}</h2>
        <h2>y:{{scrollPosition.y}}</h2>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>
<br><br><br><br>

</template>

<script>
import { ref } from 'vue'
import useCounter from '@/Setup-hooks练习/hooks/useCounter';
import useTitle from '@/Setup-hooks练习/hooks/useTitle';
import useScrollPosition from '@/Setup-hooks练习/hooks/useScrollPosition';
export default {
    setup(){
        //1.counter逻辑
      const {counter,increment,decrement} = useCounter()
        //2.首页
          const {title} = useTitle('首页')
         function popularClick(){
            title.value = '首页-流行'
         }function hotClick(){
            title.value = '首页-热门' 
         }function songClick(){
            title.value = '首页-歌单'
  
        }
      useTitle('首页')
      //3.滚动位置
      const { scrollPosition} = useScrollPosition()
      console.log(scrollPosition);
      return{
            counter,
            increment,
            decrement,
            popularClick,
            hotClick,
            songClick,
            scrollPosition
        }
    }
}
</script>

<style scoped>

</style>