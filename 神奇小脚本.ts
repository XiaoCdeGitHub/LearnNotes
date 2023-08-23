import * as fs from 'fs';
import * as childProcess from 'child_process';

const filePath = 'path/to/file.txt'; // 要修改的文件路径
const commitMessage = 'Update file'; // 提交的消息

function modifyFile() {
  // 在这里编写修改文件的逻辑
  // 例如，你可以使用 fs 模块读取文件内容，对其进行修改，然后再写回文件中
  // 这里只是一个简单的示例，将文件内容修改为当前时间戳
  const content = `Current timestamp: ${Date.now()}`;
  fs.writeFileSync(filePath, content);
}

function commitChanges() {
  // 执行 Git 命令提交修改
  const commitCommand = `git commit -am "${commitMessage}"`;
  childProcess.execSync(commitCommand);
}

// 定义定期执行的时间间隔（单位：毫秒）
const interval = 24 * 60 * 60 * 1000; // 24小时

// 首先执行一次修改和提交
modifyFile();
commitChanges();

// 设置定时器，定期执行修改和提交操作
setInterval(() => {
  modifyFile();
  commitChanges();
}, interval);