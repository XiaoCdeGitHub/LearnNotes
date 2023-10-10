// function findCombinations(arr) {
//     const result = []; // 存储结果的数组
//   //遍历决策树，递归调用前做选择，递归调用之后撤回选择
//     function backtrack(temp, start) {
//       result.push([...temp]); // 将当前组合加入结果数组
  
//       for (let i = start; i < arr.length; i++) {
//         temp.push(arr[i]); // 将当前元素加入组合
  
//         // 递归调用，查找下一个元素的组合
//         backtrack(temp, i + 1);
  
//         temp.pop(); // 回溯，将当前元素移出组合
//       }
//     }
  
//     backtrack([], 0); // 从索引0开始回溯
  
//     return result;
//   }

function findCombinations(nums) {
  let res = [];
  let track = [];
  let used = new Array(nums.length).fill(false);
  const backtrack = function (nums,track,used){
    if (track.length === nums.length) {
      res.push([...track])
      return;
    }
    for (let i = 0; i < nums.length; i++){
      if (used[i]) {
        continue;
      }
      track.push(nums[i]);
      used[i] = true;
      backtrack(nums, track, used);
      track.pop();
      used[i] = false;
    }
   
  }
  backtrack(nums, track, used);
  return res;
}
  
  const array = [1, 2, 3];
  const combinations = findCombinations(array);
  console.log(combinations);