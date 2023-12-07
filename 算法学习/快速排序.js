/***
 * @param array 待排序数组
 */
//实现一
function quickSort(array,left,right){
    if(Object.prototype.toString.call(array).slice(8,-1) ==='Array'&& typeof left === 'number' && typeof right ==='number'){
        if(left<right){
            let x = array[right],i = left-1,temp;
            for (let j = left; j < right; j++) {
                if(array[j] <=x){
                    i++;
                    temp = array[j];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array,left,i-1);
            quickSort(array,i+1,right);
        }
        return array;
    }
    else{
        return 'array is not an Array or left or right is not a number!'
    }
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr,0,arr.length-1));

//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]