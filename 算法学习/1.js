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
function bubbleSort(arr) { 
    var len = arr.length; 
    for (var i = 0; i < len - 1; i++) { 
        for (var j = 0; j < len - 1 - i; j++) { 
            if (arr[j] > arr[j + 1]) { //相邻元素两两对比 
                var temp = arr[j + 1]; //元素交换 
                arr[j + 1] = arr[j]; 
                arr[j] = temp; 
            } 
        } 
    } 
    return arr; 
}