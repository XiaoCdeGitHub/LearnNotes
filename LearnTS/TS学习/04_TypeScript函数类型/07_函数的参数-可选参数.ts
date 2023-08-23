function foo(x: number, y?: number) {
    if (y !== undefined) {
        console.log(y + 10);
    }
}
foo(10)
foo(10, 20)
//可选参数的类型是？ number|undefined联合类型
export { }