"use strict";
exports.__esModule = true;
function calc(calcFn) {
    var num1 = 10;
    var num2 = 20;
    var res = calcFn(num1, num2);
    console.log(res);
}
function sum(num1, num2) {
    return num1 + num2;
}
calc(sum);
