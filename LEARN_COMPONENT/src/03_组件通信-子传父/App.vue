<!--  -->
<template>
    <div class='app'>
        <h2>当前计数：{{ counter }}</h2>
       <add-counter @add="addBtnClick"></add-counter>
       <sub-counter @sub="subBtnClick"></sub-counter>
    </div>
</template>



<script>
import AddCounter from './AddCounter.vue';
import SubCounter from './SubCounter.vue';
export default {
    components:{
        AddCounter,
        SubCounter,
    },

    data() {
        //这里存放数据
        return {
            counter: 0
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        addBtnClick(count){
    this.counter += count;
        },
        subBtnClick(count){
        this.counter -= count;
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