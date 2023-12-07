type Timer = ReturnType<typeof setTimeout>|null

function myThrottle<T extends(...args:any[])=>void>(fn:T, interval:number, immediate = true, trailing = true) {
    let startTime = 0;
    let timer:Timer = null;
    const _throttle = function (...args:Parameters<T>) {
        const nowTime = new Date().getTime()
        //对立即执行进行控制
        if (!immediate && startTime === 0) {
            startTime = nowTime
        }
        const waitTime = interval - (nowTime - startTime);
        if (waitTime <= 0) {
            if(timer)clearTimeout(timer)
            fn.apply(this, args)
            startTime = nowTime;
            timer = null;
            return
        }
        //3.判断是否需要执行尾部
        if (trailing && !timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                startTime = new Date().getTime()
                timer = null;
            }, waitTime);
        }
        
    }
    return _throttle
}
export{}