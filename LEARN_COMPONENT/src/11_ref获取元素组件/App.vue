<template>
    <div class="app">
        <h2 ref="title" class="title" :style="{color:titleColor}">Hello {{message}}</h2>
        <button ref="btn" @click="changeMessage">changeMessage</button>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            message: '脆脆鲨大帅哥',
            titleColor:'red'
        }
    },
    methods:{
        changeMessage(){
         /*    this.message = '脆脆鲨超级无极大帅哥',
            this.titleColor = 'blue' */
            console.log(this.$refs.title);
            console.log(this.$refs.btn);
        }
    }
}
</script>

<style scoped>

</style>