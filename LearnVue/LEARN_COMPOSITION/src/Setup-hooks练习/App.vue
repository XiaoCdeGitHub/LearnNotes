<template>
  <div>AppContent</div>
  <button @click="changeTitle">修改title</button>
  <!-- <home></home>
  <hr>
  <about></about> -->
  <button @click="currentPage = 'home'">home</button>
  <button @click="currentPage = 'about'">about</button>
  <component :is="currentPage"></component>
</template>

<script >
import { ref } from 'vue';
import Home from './views/Home';
import About from './views/About';
import useTitle from './hooks/useTitle';

export default {
  setup(){
    const currentPage = ref("home")
  function changeTitle(){

    useTitle('app title');
  }
  return {
  changeTitle,
  currentPage
}
},
components:{
    Home,
    About
},


}
</script>
 
<style scoped>

</style>