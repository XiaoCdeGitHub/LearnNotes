<template>
    <div class="">
        <h2>{{ message }} </h2>
        <button @click="changeMessage">修改message</button>
    </div>
</template>

<script>
export default {
    data(){
       return{
        message:'脆脆鲨真帅'
       }
    },
    methods:{
        changeMessage(){
            this.message = '脆脆鲨真帅脆脆鲨真帅脆脆鲨真帅'
        }
    },
    //1.组件被创建之前
    beforeCreate(){
        console.log('beforeCreate');
    },
    //2.组件被创建完成
    created(){
        console.log('组件被创建完成');
        console.log('1.发送网络请求，请求数据，使用data');
        console.log('2.监听eventbus事件');
        console.log('3.监听watch数据');
    },
    //3.组件template准备被挂载
    beforeMount(){
        console.log("beforeMount");
    },
    //4.组件template被挂载 ：虚拟DOM ->真实DOM
    mounted(){
        console.log('mounted');
        console.log('获取DOM');
        console.log('2.使用DOM');
    },
    //5.数据发生改变
    //5.1准备更新DOM
    beforeUpdate(){
        console.log('beforeUpdate');
    },
    //5.2更新DOM
    updated(){
        console.log('updated');
    },
    //6.准备卸载VNode -> DOM元素
    //6.1卸载之前
    beforeUnmount(){
        console.log('beforeUnmount');
    },
    //6.2DOM元素已经被卸载完成
    unmounted(){
        console.log('unmounted');
    }

}
</script>

<style scoped>

</style>