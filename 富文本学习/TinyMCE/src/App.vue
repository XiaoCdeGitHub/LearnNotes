<!--
 * @Author: 崔鼎 1692338302@qq.com
 * @Date: 2023-09-13 10:45:17
 * @LastEditors: 崔鼎 1692338302@qq.com
 * @LastEditTime: 2023-09-13 15:57:48
 * @FilePath: \全栈之路\富文本学习\TinyMCE\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-content-container">
    <tinymce-editor v-model="tinycontent"></tinymce-editor>
  </div>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';

import TinymceEditor from '@/components/MyTiny/TinymceEditor.vue';

const tinycontent = ref<string>('');
</script>
 
<style scoped></style>