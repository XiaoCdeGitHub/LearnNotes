//获取DOM元素 <img class="img"/>
// const imgEl = document.querySelector('img');
// if(imgEl!==null){
//     imgEl.src = "xxx"
//     imgEl.alt = "yyy"
// }

const imgEl = document.querySelector('.img') as HTMLImageElement;
imgEl.src = "xxx"
imgEl.alt = "yyy"