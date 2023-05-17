<template>
    <div class="counter">
        <h2>当前计数：{{ counter }}</h2>
        <button @click="changeCounter">修改counter</button>
    </div>
</template>

<script>
export default {
    props:{
        counter:{
            type:Number,
            default:0
        }
    },
    emits:['update:counter'],
    methods:{
        changeCounter(){
            this.$emit('update:counter',1000);
        }
    }
}
</script>

<style scoped>

</style>