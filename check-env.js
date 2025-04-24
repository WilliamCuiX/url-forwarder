// 检查环境变量脚本
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 读取 .env.development.local 文件
const envFile = '.env.development.local';
const envContent = fs.readFileSync(envFile, 'utf8');
console.log('Env file content length:', envContent.length);

// 使用 dotenv 解析
const parsed = dotenv.parse(envContent);

// 打印所有以 path_ 开头的变量
console.log('====== 找到的 path_ 变量 ======');
Object.keys(parsed)
  .filter(key => key.startsWith('path_'))
  .forEach(key => {
    console.log(`- ${key} (length: ${parsed[key].length})`);
  });

// 特别检查 path_yh
if (parsed.path_yh) {
  console.log('\n====== path_yh 详情 ======');
  console.log(parsed.path_yh);
} else {
  console.log('\n❌ 没有找到 path_yh 变量');
} 