// 禁用弃用警告
process.noDeprecation = true;

// 启动 Vercel 开发服务器
const { spawn } = require('child_process');
const vercel = spawn('npx', ['vercel', 'dev'], { 
  stdio: 'inherit',
  shell: true 
});

vercel.on('error', (err) => {
  console.error('启动失败:', err);
  process.exit(1);
}); 