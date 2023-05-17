<template>
    <div class="app">
        <input type="text" v-model="message">
        <input type="text" :value="message" @input='message = $event.target.value'>
        <Counter v-model ='appCounter'></Counter>
        <!-- <Counter v-bind:modelValue="appCounter" @update:modelValue="appCounter = $event"></Counter> -->
    
        <counter2 v-model:counter ='appCounter'></counter2>
    
    </div>
</template>

<script>
import Counter from './Counter.vue'
import Counter2 from './Counter2.vue'
export default {
        data(){
            return{
                message:'Hello 脆脆鲨',
                appCounter:100
            }
        },components:{
            Counter,
            Counter2
        }
}
</script>

<style scoped>

</style>