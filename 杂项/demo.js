var majorityElement = function(nums) {
    // TODO
    const length = nums.length;
    const time = Math.floor(length / 3);
    const map = new Map();
    const result = [];
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1)
    }
    console.log('map.entries()',map.entries());
    for (let [num,count] of map.entries()){
        if (count > time) {
            result.push(num)
        }
        
    }
    return result


};

console.log(majorityElement([3,2,3]))


