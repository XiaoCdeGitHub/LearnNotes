# GSAP
GSAP 是一个强大的 JavaScript 工具集，可以将开发人员变成动画超级英雄。构建适用于所有主流浏览器的高性能动画。动画化 CSS、SVG、画布、React、Vue、WebGL、颜色、字符串、运动路径、通用对象……任何 JavaScript 可以触及的东西！ GSAP 的 ScrollTrigger 插件可让您使用最少的代码创建令人惊叹的基于滚动的动画。

GSAP官网：https://greensock.com/ Github仓库:https://github.com/greensock/GSAP

## 开始
最常用的api gsap.to gsap.from
首先我们先引入cdn即可使用GSAP  
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
```

### gsap.to
gsap.to()三个参数可以填写
gsap.to("你的目标target",{你所要做出的动作},"提前时间或滞后时间")
gsap.to其实就是将你所要操作的元素到你所指定的位置

```js

<div class="box green"></div>
<div class="box purple"></div>
<div class="box blue"></div>

```

```css
.box {
  height: 20px;
  width: 20px;
}
.green {
  background-color: green;
}
.purple {
  background-color: purple;
}
.blue {
  background-color: blue;
}
```

```js
gsap.to(".green", { rotation: 360, x: 100, duration: 1 });
// 将.green的div旋转360° 并且位移100 动画时间为1s
// 若想要将所有的方块一起动的话只需要同时选择多个目标就行了
// gsap.to(".green, .purple", { rotation: 360, x: 100, duration: 1 }) 
// 或
// gsap.to(".box", { rotation: 360, x: 100, duration: 1 })
```

### gsap.from 与to正好相反
to里面参数是指定目标到特定位置，from其实就是反过来罢了，给的参数是起始位置

```js

gsap.from(".box", { rotation: 360, x: 100, duration: 1 })
// 将class为box的元素  从x=100的位置到之前css写的定义位置

```


### gsap.timeline

```js
// 先定义一条时间线
let tl = gsap.timeline({ duration: 1 };
// let tl = gsap.timeline({  };也是可以的
);
// 开始基于时间线做一些动画 结合上面的 gsap.to 和 gsap.from
tl.to(".box", { x: 100, opacity: 0.5 }).to(".box", { rotation: 360 });
//你也可以这么写 实现最后的效果是一样的不过写法会麻烦一点
tl.to(".box", { x: 100, opacity: 0.5 });
tl.to(".box", { rotation: 360 });


```

### stagger参数
stagger参数是来控制如果多目标的时候，每个目标动画的时间差，这么说你可能有点听不懂，下面直接拿timeline的例子改写一下。
实现目标：每个box间隔0.2秒位移100（并不是同时位移） 并且执行旋转也是间隔0.3

```js
let tl = gsap.timeline({ duration: 1 };
// let tl = gsap.timeline({  };也是可以的
);
// 开始基于时间线做一些动画 结合上面的 gsap.to 和 gsap.from
tl.to(".box", { x: 100, opacity: 0.5,stagger: .1 }).to(".box", { rotation: 360,stagger: .1 });

```

### 重复动画以及往返效果
repeat参数以及yoyo

repeat参数为重复次数  循环为-1


yoyo 是否恢复到原来的状态（反方向动画） 像小时候的悠悠球，放下去再收上来设置
 yoyo: true 时，repeat 不能设置为 0

如果动画不止要做出一次 要做无限次或者说有个往复效果如何去做呢？
js复制代码let tl = gsap.timeline({ duration: 1 };
);
tl.to(".green", { x: 100,repeat: -1, yoyo: true });
//将 .green的div旋转360° 并且位移100 动画时间为1s repeat为重复次数

### 控制动画的暂停、开始、回放


#### paused
你所要指定的动画可能不是一上来就自动执行的呢，而是通过手动触发的（像上面的菜单栏的例子） 如何去做呢

我们在timeline里面传参让这个动画上来不执行 我们通过按钮来触发

```js
const bt = document.querySelector("button");

let tl = gsap.timeline({ paused: true }
);
tl.to(".green", { x: 100, opacity: 0.5,repeat: -1, yoyo: true })
bt.onclick = () => {
  tl.play();
}
```

#### timeline的控制播放、暂停、回放
通过timeline.play()、timeline.pause()、timeline.reverse()来控制

```js
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const reverse = document.querySelector("#reverse");
let tl = gsap.timeline({ paused: true }
);
tl.to(".green", { x: 100, opacity: 0.5, duration: 3 })
play.onclick = () => {
  tl.play();
}
pause.onclick = () => {
  tl.pause();
}
reverse.onclick = () => {
  tl.reverse();
}

```

## 实现滚动触发动画
通过滚动来触发动画，其实是依赖了gsap的一个插件 scrollTrigger

下面稍微粗略讲一下大致过程，其实用到的还是上面gsap.to和gsap.from

scrollTrigger官方文档：https://greensock.com/docs/v3/Plugins/ScrollTrigger


```js
gsap.to(".b", {
    x: 400,
  rotation: 360,
  scrollTrigger: { 
    trigger: ".b",  //触发元素
    start: "top center",  //开始动画的时机
    end: "top 100px", // 截止动画的时机
    scrub: true,  // 是否使用滚动以及回滚会回放动画
    markers: true, // 开启标注功能（更好看滚动开始以及截止的地方）
  }
});

```

其中start：第一个参数为元素的位置 第二个为视口的位置 当两者重合的时候会开启动画

参数可以为百分比 或者top center bottom



这里推荐一个可以编辑的clip-path可视化网站：bennettfeely.com/clippy/