<!--  -->
<template>
<div class='nav-bar'>
    <div class="left">
        <slot name="left">left</slot>
</div>
    <div class="center">
        <slot name="center">center</slot>
    </div>
    
    <div class="right">
        <slot name="right">right</slot>
    </div>


</div>
</template>

<script>

export default {
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
//beforeCreate() {}, //生命周期 - 创建之前
//beforeMount() {}, //生命周期 - 挂载之前
//beforeUpdate() {}, //生命周期 - 更新之前
//updated() {}, //生命周期 - 更新之后
//beforeDestroy() {}, //生命周期 - 销毁之前
//destroyed() {}, //生命周期 - 销毁完成
//activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/* @import url()引入公共css类 */
.nav-bar {
    display: flex;
    height:44px;
    line-height: 44px;
    text-align: center;
}
.left{
    width:80px;
    background-color: red;
}
.center{
    flex:1;
    background-color: skyblue;
}
.right{
    width:80px;
    background-color: orange;
}
</style>