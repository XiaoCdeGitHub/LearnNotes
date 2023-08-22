<!--  -->
<template>
<div class='app'>
<!-- 1.tab-control -->
<tab-control :titles="['衣服','鞋子','裤子']"
@tab-item-click="tabItemClick" ></tab-control>

<!-- 2.展示内容 -->

<h1>{{ pageContents[currentIndex] }}</h1>

<tab-control :titles="['衣服','鞋子','裤子']"
@tab-item-click="tabItemClick" >
<template #default="props">
<button>{{ props.item }}</button>
</template>
</tab-control>

<tab-control :titles="['衣服','鞋子','裤子']"
@tab-item-click="tabItemClick" >
<template #default="props">
    <a herf="">{{props.item}}</a>
</template>

</tab-control>


</div>
</template>

<script>
import TabControl from './TabControl.vue';


export default {
    components:{TabControl},
data() {
//这里存放数据
return {
    pageContents:['衣服列表','鞋子列表','裤子列表'],
    currentIndex:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    tabItemClick(index){
        console.log('app',index);
        this.currentIndex = index;
    }
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