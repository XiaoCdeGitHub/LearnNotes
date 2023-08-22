<template>
    <div class="app">
        {{ message }}
        <button @click="changeMessage">changeMessage</button>
        <hr>
        <h2>账号：{{ account.username }}</h2>
        <h2>密码：{{ account.password }}</h2>
        <button @click="changeAccount">修改账号</button>
        <hr>
        {{ counter }}
    </div>
</template>

<script>
import {reactive} from 'vue'
import {ref} from 'vue'
export default {
    setup(){
        //1.定义普通数据 可以正常的被使用
        //缺点：数据不是响应式
        // const message = 'Hello 脆脆鲨'
        let message = 'Hello 脆脆鲨'
        function changeMessage(){
            message = 'Hello 帅哥脆脆鲨'
        }
        //2.定义响应式数据
        //2.1 reactive函数 定义复杂类型的数据
        const account = reactive({
            username:'cuicuisha',
            password:'521521',
        })
        
        function changeAccount(){
            account.username = '脆脆'
        }
        //2.2ref函数：定义简单类型函数（也可定义复杂类型数据）
        //counter
        
        const counter = ref(100)
 
        return {message,changeMessage,account,changeAccount,counter}
    }
}
</script>

<style scoped>

</style>