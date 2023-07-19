function quickSort(array, left, right) {
    // 首先进行参数的类型检查
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' &&
      typeof left === 'number' && typeof right === 'number') {
      // 如果左边界小于右边界，则继续进行排序
      if (left < right) {
        // 选择数组的最后一个元素作为基准值
        let x = array[right];
        // i是小于基准值的元素的最后一个下标
        let i = left - 1;
        let temp;
        // 遍历数组，将小于基准值的元素放到数组的左边
        for (let j = left; j < right; j++) {
          if (array[j] <= x) {
            i++;
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;
          }
        }
        // 把基准值放到正确的位置上
        array[right] = array[i + 1];
        array[i + 1] = x;
        // 对左边和右边的子数组分别进行排序
        quickSort(array, left, i);
        quickSort(array, i + 2, right);
      }
      // 返回排序后的数组
      return array;
    } else {
      return 'array is not an Array or left or right is not a number!';
    }
  }
  var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr,0,arr.length-1));