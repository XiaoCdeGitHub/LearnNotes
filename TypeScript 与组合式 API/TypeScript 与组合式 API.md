# TypeScript 与组合式 API

## 为组件的props标注类型
使用`<script setup>`
当使用`<script setup>`时，defineProps()宏函数支持从它的参数中推导类型：

```html
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})
props.foo // string
props.bar //number | undefined 

</script>
```
这被称为“运行时声明”，因为传递给defineProps()的参数会座位运行时的props选项来使用

然而 通过泛型参数来定义props的类型通常更直接：
```html
<script setup lang="ts">
const props = defineProps<{
    foo:string
    bar?:number
}>()

</script>

```

这被称为“基于类型的声明”编译器会尽可能地尝试根据类型参数推导出等价的运行时选项。
基于类型的声明或者运行时声明可以择一使用，但是不能同时使用。
我们也可以将 props 的类型移入一个单独的接口中：
```vue
<script setup lang='ts'>
interface Props{
    foo:string;
    bar?:string;
}
const props = definedProps<Props>()
</script>

```

## Props 解构默认值
当使用基于类型的声明时：我们失去了为props声明默认值的能力。这可以通过withDefaults编译器宏解决：
```ts
export interface Props{
    msg?:string
    labels?:string[]
}
const props = withDefaults(defineProps<Props>(),{
    msg:"hello",
    labels:()=>['one','two']
})
```

这将被编译为等效的运行时 props default 选项。此外，withDefaults 帮助程序为默认值提供类型检查，并确保返回的 props 类型删除了已声明默认值的属性的可选标志。

## 非 <script setup> 场景下

如果没有使用`<script setup>` 那么为了开启props的类型推导，必须使用defineComponent()。
传入setup()的props对象类型是从props的选项中推导而来。


```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- 类型：string
  }
})

```
## 复杂的 prop 类型

通过**基于类型的声明**，一个prop可以像使用其他任何类型一样使用一个复杂类型：

```vue

<script setup lang="ts">
interface Book{
    title:string
    author:string
    year:number
}
const props = defineProps<{
    book:Book
}>()
</script>

```

对于**运行时声明**这种方法，我们可以使用PropType工具类型：
```ts

import type { PropType } from 'vue'

const props = defineProps({
    book:Objtect as PropType<book>
})

```
其工作方式与直接指定 props 选项基本相同

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```
## 为组件的emits标注类型


