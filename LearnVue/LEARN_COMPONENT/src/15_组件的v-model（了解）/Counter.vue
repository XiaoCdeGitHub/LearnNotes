<template>
    <div class="counter">
        <h2>当前计数：{{ modelValue }}</h2>
        <button @click="changeCounter">修改counter</button>
    </div>
</template>

<script>
export default {
    props:{
        modelValue:{
            type:Number,
            default:0
        }
    },
    emits:['update:modelValue'],
    methods:{
        changeCounter(){
            this.$emit('update:modelValue',1000);
        }
    }
}
</script>

<style scoped>

</style>