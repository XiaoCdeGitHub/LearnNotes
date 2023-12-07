//一个数组长度为n，乱序，找出其中唯一不存在的数 [2,3,0] 输出1
function lostNum(arr) {
    arr.sort((a, b) => a - b);
    for (i = 0; i < arr.length; i++){
        if (arr[i] !== i) {
            return i;
        }
    }
}
console.log(lostNum([2, 3, 0]));
//网上题解：1.全部求和 2.异或运算
//1.全部求和
function lostNum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    let n = arr.length + 1;
    return (n - 1) * n / 2 - sum;
}
//2.异或运算 异或存在交换律 所以说 可以用res存储原数组的异或值，去与全部数组的异或值进行一次异或操作
//一操作，相同的值异或自己为0，剩下的就是缺失的值 0异或任何数都是任何数 
function lostNum(arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++){
        res ^= arr[i];
    }
    for (let i = 0; i <= arr.length; i++){
        res ^= i;
    }
    return res;
}