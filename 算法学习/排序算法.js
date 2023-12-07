//快速排序函数
function quickSort(arr) { 
    if (arr.length <= 1) { return arr; } 
    var pivotIndex = Math.floor(arr.length / 2); 
    var pivot = arr.splice(pivotIndex, 1)[0]; 
    var left = []; 
    var right = []; 
    for (var i = 0; i < arr.length; i++) { 
        if (arr[i] < pivot) { 
            left.push(arr[i]); 
        } else { 
            right.push(arr[i]); 
        } 
    } 
    return quickSort(left).concat([pivot], quickSort(right)); 

}
//冒泡排序
// function bubbleSort(arr) { 
//     let len = arr.length;
//     for (let i = 0; i < len - 1; i++){
//         for (let j = 0; j < len - 1 - i; j++) { 
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j+1] = temp;
//             }
//         }
//     }
//     return arr; 
// }
// //1，2，3，5，8
// const newArr = bubbleSort([3, 2, 1, 5, 8]);
// console.log(newArr);