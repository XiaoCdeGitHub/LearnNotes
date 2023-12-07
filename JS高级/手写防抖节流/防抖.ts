/*
本质其实是去返回一个经过处理后的新的函数
这个处理就是一个延时的过程
防抖就是后一次的事件取消了上一次的事件的执行
*/

// type Timer=ReturnType<typeof setTimeout> | null;

// function myDebounce<T extends (...args:any[])=>void>(fn:T, delay:number) {
//     let timer:Timer = null;
//     const _debounce = function (...args:Parameters<T>) {
//         if (timer) clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.apply(this, args)
//             timer = null
//         },delay)
//     }
//     return _debounce
// }

type Timer = ReturnType<typeof setTimeout> | null;

function myDebounce<T extends(...args: any[]) => void>(fn:T, delay:number,immediate:boolean) {
    let timer:Timer = null;
    const _debounce= function (...args:Parameters<T>) {
        if(timer)clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null;
        },delay)
    }
    return _debounce

}