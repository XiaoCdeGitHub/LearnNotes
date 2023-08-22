<!--  -->
<template>
 <div class="add">
            <button  @click="btnClick(1)">+1</button>
            <button @click="btnClick(5)">+5</button>
            <button @click="btnClick(10)">+10</button>
        </div>
</template>

<script>

export default {
    emits:{
    add(count){
        if (count>3){
            return false
        }
    }
},

methods: {
    btnClick(count){
        //让子组件发出去一个自定义事件
        this.$emit('add', count) 
    }

},
}
</script>
<style scoped>


</style>