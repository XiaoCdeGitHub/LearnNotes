//面快手时考出来了，第一次做
function generatePascalTriangle(n) { 
    const triangle = []
    for (let i = 0; i < n; i++){
        triangle[i] = []
        triangle[i][0] = 1;
        for (let j = 1; j < i; j++){
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
        triangle[i][i] = 1;
    }
    return triangle
}

// 生成前6行的杨辉三角
const numRows = 6;
const pascalTriangle = generatePascalTriangle(numRows);

// 打印杨辉三角
for (let i = 0; i < numRows; i++) {
  const row = pascalTriangle[i];
  let rowString = "";
  
  for (let j = 0; j <= i; j++) {
    rowString += row[j] + " ";
  }
  console.log(rowString);
}