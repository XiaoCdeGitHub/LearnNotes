<template>
    <div class="">
        <h2>About计数器：{{ counter }}</h2>
        <button @click='increment'>+1</button>
        <button @click='decrement'>-1</button>

    </div>
</template>

<script>
import useCounter from '../hooks/useCounter';
import useTitle from '@/Setup-hooks练习/hooks/useTitle';

export default {
    setup(){
        useTitle('关于')
        return{
            ...useCounter()
        } 
    }

}
</script>

<style scoped>

</style>