/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//笨蛋解法：复杂度O(n^2)
// var twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//         let value = target - nums[i];
//         let index = nums.findIndex(num => num === value);
//         if (index !== -1 && index !== i) {
//             return [i, index];
//         }
//     }
// };
// console.log(twoSum([2, 7, 11, 15], 9));

//哈希表解法：复杂度O(n)'
//只遍历一次，遍历过后假如在哈希表内没有找到对应的值，则将当前值存入哈希表
//找到的话，返回当前值的索引index和哈希表内对应值的索引index
var twoSum = function(nums, target) {
    const map = new Map(); 
    for (let i = 0; i < nums.length; i++){
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i)
    }
   
};

console.log(twoSum([2, 7, 11, 15], 9));