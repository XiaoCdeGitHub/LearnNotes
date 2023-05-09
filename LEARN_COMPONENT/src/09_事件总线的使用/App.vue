<template>
    <div class="app">
        <Home></Home>
        <h2>{{ message }}</h2>
        <button @click="remove">移除category</button>
        <Category v-if="isShowCategory"></Category>
    </div>
</template>

<script>
import Home from './Home.vue';
import eventBus from './utils/event-bus';
import Category from './Category.vue';

export default {
    components: {
        Home,
        Category
    },
    data() {
        return {
            message: '脆脆鲨真帅',
            isShowCategory:true
        }
    },
    created() {
        //事件监听
        eventBus.on('whyEvent', (name, age, height) => {
            console.log('whyEvent事件在app中监听', name, age, height);
            this.message = `name: ${name},age: ${age},height: ${height}`;
        })
    },
    methods:{
        remove(){
            this.isShowCategory = false;
        }
    }

}
</script>

<style scoped></style>