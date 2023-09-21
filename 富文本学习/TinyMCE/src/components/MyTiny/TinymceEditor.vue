<!--
 * @Author: 崔鼎 1692338302@qq.com
 * @Date: 2023-09-13 14:37:22
 * @LastEditors: 崔鼎 1692338302@qq.com
 * @LastEditTime: 2023-09-14 10:27:43
 * @FilePath: \全栈之路\富文本学习\TinyMCE\src\components\MyTiny\TinymceEditor.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <editor v-model="tinycontent" :init="tinyinit" :api-key="apiKey" />
</template>
 
<script setup lang="ts">
import { computed, ref } from 'vue';
// script
// import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

import { TINY_FONT_FAMILY_FORMATS, TINY_FONT_SIZE_FORMATS, TINY_PLUGINS, TINY_TOOLBAR } from './constants';
// tinymce.baseURL = 'tinymce';
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  plugins: {
    type: [String, Array],
    default: TINY_PLUGINS,
  },
  toolbar: {
    type: [String, Array],
    default: TINY_TOOLBAR,
  },
  toolbarMode: {
    type: String,
    default: 'wrap',
  },
  fontFamilyFormats: {
    type: String,
    default: TINY_FONT_FAMILY_FORMATS,
  },
  fontSizeFormats: {
    type: String,
    default: TINY_FONT_SIZE_FORMATS,
  },
  apiKey: {
    type: String,
    default: '6tod7t4tbu2wf2g6pphzdmg6574fz6w9yixhw1e8ok8sxqz5',
  }
});

const tinyinit = ref({
  apiKey: '6tod7t4tbu2wf2g6pphzdmg6574fz6w9yixhw1e8ok8sxqz5',
  height: window.innerHeight - 50,
  resize: "both", // 用户调整大小
  language_url: '/tinymce/langs/zh_Hans.js', // 汉化路径
  language: 'zh-Hans',
  branding: false, // 隐藏tinymce右下角水印
  convert_urls: false, // 不自动转换链接地址
  plugins: props.plugins, // 插件
  contextmenu: '', // 上下文菜单
  menubar: true, // 菜单栏
  toolbar_mode: props.toolbarMode, // 工具栏多行显示样式
  toolbar: props.toolbar, // 工具栏
  font_family_formats: props.fontFamilyFormats, // 字体选择
  font_size_formats: props.fontSizeFormats, // 字号选择

});

const emit = defineEmits(['update:modelValue']);

// 双向绑定
const tinycontent = computed({
  get(): string {
    return props.modelValue;
  },
  set(value:any) {
    emit('update:modelValue', value);
  },
});
</script>
 
<style scoped></style>