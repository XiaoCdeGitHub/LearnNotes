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

在`<script setup>`中 emit函数的类型标注也可以通过**运行时声明**或是**类型声明**进行：
```ts
<script setup lang="ts">
//运行时
const emit = defineEmits(['change',"update"])

//基于类型
const emit = defineEmits<{
(e:'change',id:number):void
(e:'update',value:string):void
}>()

//3.3+ 
const emit  = defineEmits<{
  change:[id:number]
  update:[value:string]

}>

</script>

```

类型参数可以是以下的一种：

一个可调用的函数类型，但是写作一个包含调用签名的类型字面量。它将被用作返回的 函数的类型。emit
一个类型字面量，其中键是事件名称，值是数组或元组类型，表示事件的附加接受参数。上面的示例使用了具名元组，因此每个参数都可以有一个显式的名称。
我们可以看到，基于类型的声明使我们可以对所触发事件的类型进行更细粒度的控制。

若没有使用 ， 也可以根据 选项推导暴露在 setup 上下文中的 函数的类型：
```ts
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- 类型检查 / 自动补全
  }
})
```




## 为ref()标注类型

ref 会根据初始化时的值推导其类型：
```ts
//ref会根据初始化时的值推导其类型
const year = ref(2020)

```
有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 这个类型：Ref
```ts
import { ref } from 'vue'
import type { Ref } from 'vue'


const year = Ref<string|number> = ref('2020')

```
或者，在调用 时传入一个泛型参数，来覆盖默认的推导行为：ref()
```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```
如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 的联合类型：undefined

```ts
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()

```


## 为 标注类型 reactive()
reactive() 也会隐式地从它的参数中推导类型：

```ts
import { reactive } from 'vue'

const book = reactive({ title:'Vue3指引'})
```

要显式地标注一个变量的类型，我们可以使用接口：reactive

```ts
import { reactive } from 'vue'

interface Book{
  title:string
  year?:number
}
const book:Book = reactive({ title:'vue3指引' })

```

reactive()不推荐使用的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。

## 为标注类型computed()


computed() 会自动从其计算函数的返回值上推导出类型：
```ts
import {ref,computed} from 'vue'
const count = ref(0)
// 推导得到的类型：ComputedRef<number>
const double = computed(()=>count.value *2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

还可以通过泛型参数显式指定类型：
```ts
const double = computed<number>(()=>{
   // 若返回值不是 number 类型则会报错
})
```


## 为事件处理函数标注类型

在处理原生DOM时，应该为我们传递给事件处理函数的参数正确地标注类型

```ts
<script setup lang="ts">
function handleChange(event) {
  // `event` 隐式地标注为 `any` 类型
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```
没有类型标注时，这个event参数会隐式地标注为any类型。这也会在tsconfig.json中配置了"strict":true 或"noImplicitAny": true时报出一个 TS 错误。因此，建议显式地为事件处理函数的参数标注类型。此外，你在访问event上的属性时可能需要使用类型断言： 
```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## 为provide/inject标注类型

provide和inject通常会在不同的组件中运行，要正确地为注入的值标记类型，vue提供了一个InjectionKey接口，它是一个继承自 Symbol泛型类型

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined

```
建议将注入 key 的类型放在一个单独的文件中，这样它就可以被多个组件导入。

当使用字符串注入 key 时，注入值的类型是 ，需要通过泛型参数显式声明：unknown

```ts
const foo = inject<string>('foo') // 类型：string | undefined
注意注入的值仍然可以是 ，因为无法保证提供者一定会在运行时 provide 这个值。undefined
```
当提供了一个默认值后，这个 类型就可以被移除：undefined

```ts
const foo = inject<string>('foo', 'bar') // 类型：string
```
如果你确定该值将始终被提供，则还可以强制转换该值：

```ts
const foo = inject('foo') as string
```

## 为模板引用标注类型

有时，你可能需要为一个子组件添加一个模板引用，以便调用它公开的方法。举例来说，我们有一个 子组件，它有一个打开模态框的方法：MyModal

vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
为了获取 的类型，我们首先需要通过 得到其类型，再使用 TypeScript 内置的 工具类型来获取其实例类型：MyModaltypeofInstanceType

vue
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
注意，如果你想在 TypeScript 文件而不是在 Vue SFC 中使用这种技巧，需要开启 Volar 的 Takeover 模式。

如果组件的具体类型无法获得，或者你并不关心组件的具体类型，那么可以使用 。这只会包含所有组件都共享的属性，比如 。ComponentPublicInstance$el

```ts
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = ref<ComponentPublicInstance | null>(null)
```


