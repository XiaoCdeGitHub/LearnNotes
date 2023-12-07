function patternMatching(pattern, target) {
    const patternArr = pattern.split("");
    const words = target.split(" ");
    console.log('patternArr:',patternArr);
    console.log('words:',words);
    const patternMap = new Map();
    const wordSet = new Set();
  
    if (patternArr.length !== words.length) {
      return false;
    }
  
    for (let i = 0; i < patternArr.length; i++) {
      const patternChar = patternArr[i];
      const word = words[i];
  
      if (!patternMap.has(patternChar)) {
        if (wordSet.has(word)) {
          return false;
        }
  
        patternMap.set(patternChar, word);
        wordSet.add(word);
      } else {
        if (patternMap.get(patternChar) !== word) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // 测试样例
  console.log(patternMatching("abba", "red blue blue red")); // 输出: true
  console.log(patternMatching("aaaa", "red blue blue red")); // 输出: false
  console.log(patternMatching("abc", "red blue green")); // 输出: true
  console.log(patternMatching("aabb", "red red blue blue")); // 输出: true