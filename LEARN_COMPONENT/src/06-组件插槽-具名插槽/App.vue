<!--  -->
<template>
<div class=''>
    <NavBar>
        <template #left>
            <button>返回</button>
        </template>
        <template #center>
            <span>内容</span>
        </template>
        <template #right>
             <a href="#">登录</a>
        </template>
        
        
       
    </NavBar>
    <NavBar>
       
        <template #[position]>
             <a href="#">注册</a>
        </template>
    </NavBar>
    <button @click="position='left'">左边</button>
    <button @click="position='center'">中间</button>
    <button @click="position='right'"> 右边</button>
</div>
</template>

<script>
import NavBar from './NavBar.vue';


export default {
data() {
//这里存放数据
return {
    position: 'center'
};
},
components:{
    NavBar
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

</style>