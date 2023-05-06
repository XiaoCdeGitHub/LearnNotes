<!--  -->
<template>
<div class='app'>
    <show-message title='hahaha' >
        <button>我是按钮元素</button>
    </show-message>
    <show-message >
        <a href="">百度一下</a>
    </show-message>
    <show-message >
        <img src="https://cd-mapbed.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720221030103023.jpg" alt="">
    </show-message>
    <show-message >
        <!-- 没有东西替换 -->
    </show-message>
</div>
</template>

<script>
import ShowMessage from './ShowMessage.vue';

export default {
data() {
//这里存放数据
return {

};
},
components:{
    ShowMessage
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