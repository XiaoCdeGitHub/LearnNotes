<template>
        <h2>Home计数:{{ counter }}</h2>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
</template>

<script>
import { ref } from 'vue'
import useCounter from '@/Setup-hooks练习/hooks/useCounter';
export default {
    setup(){

      const {counter,increment,decrement} = useCounter()
        return{
            counter,
            increment,
            decrement
        }
    }
}
</script>

<style scoped>

</style>