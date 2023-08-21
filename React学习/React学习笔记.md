# React 学习笔记

## Hello React

用于构建用户界面的 JavaScript 库

声明式编程
UI = f(state)

开发 React 必须依赖三个库:
口 react: 包含 react 所必须的核心代码
口 react-dom: react 渲染在不同平台所需要的核心代码
口 babel: 将 jsx 转换成 React 代码的工具

ReactDOM.createRoot 函数: 用于创建一个 React 根，之后染的内容会包含在这个根中口参数:将染的内容，挂载到哪一个 HTML 元素上
这里我们已经提定义一个 id 为 app 的 div
root.render 函数:
口参数:要染的根组件
我们可以通过{}语法来引入外部的变量或者表达式

## 组件化开发

类组件和函数式组件

```js
class App extends React.Component {
  //组件数据
  constructor(props) {
    super();

    this.state = {
      message: "Hello World",
    };
  }
  //组件方法
  //渲染内容render方法
  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button>修改文本</button>
      </div>
    );
  }
}
```

组件化问题一:数据在哪里定义?
在组件中的数据，我们可以分成两类:
口 参与界面更新的数据:当数据变量时，需要更新组件渲染的内容
口不参与界面更新的数据:当数据变量时，不需要更新将组建染的内容

参与界面更新的数据我们也可以称之为是**参与数据流**，这个数据是**定义在当前对象的 state 中**
口我们可以通过在构造函数中 this.state = 定义的数据
口当我们的数据发生变化时，我们可以调用 this.setState 来更新数据，并且通知 React 进行 update 操作;√ 在进行 update 操作时，就会重新调用 render 函数，并且使用最新的数据，来渲染界面

es6内类中定义方法中的this 都指向undefined
babel也会转换成严格模式


组件化问题二:事件绑定中的this
口在类中直接定义一个函数，并且将这个函数绑定到元素的onClick事件上，当前这个函数的this指向的是谁呢?默认情况下是undefined
口 很奇怪，居然是undefined;
口因为在正常的DOM操作中，监听点击，监听函数中的this其实是节点对象(比如说是button对象);口这次因为React并不是直接染成真实的DOM，我们所编写的button只是一个语法糖，它的本质React的Element对象口那么在这里发生监听的时候，react在执行函数时并没有绑定this，默认情况下就是一个undefined;

我们在绑定的函数中，可能想要使用当前对象，比如执行 thissetState 函数，就必须拿到当前对象的this口我们就需要在传入函数时，给这个函数直接绑定this
口类似于下面的写法: <button onClick=fthischangeText.bind(this)>改变文本</button>