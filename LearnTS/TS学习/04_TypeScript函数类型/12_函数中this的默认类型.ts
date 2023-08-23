//1.对象中的函数中的this
const obj = {
    name: "why",
    studying: function () {
        //默认情况下this是any类型
        console.log(this.name,"studying");
    }
}
obj.studying()


//2.普通的函数
function foo() {
    // console.log(this); 会报错
}
export{}