<template>
    <div class="app" >
        <Home></Home>
        <button @click="message = '脆脆鲨是真的真的真的帅'">
            修改message
        </button>
    </div>
</template>

<script>
import Home from './Home.vue';
import {computed} from 'vue';

export default {
components:{
    Home
},
data(){
    return{
        message:'脆脆鲨真帅'
    }
},
provide(){
    return{
    name:'Why',
    age:'18',
    message:computed(()=>{
        return this.message;
    })
    }
}
}
</script>

<style scoped>

</style>