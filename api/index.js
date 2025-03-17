// forward-url.js
// URL转发服务，通过环境变量配置转发映射

module.exports = (req, res) => {
  // 获取请求路径
  const path = req.url.split('?')[0].substring(1);
  
  // 如果路径为空，返回使用说明
  if (!path) {
    return res.send(`
      <html>
        <head>
          <title>URL转发服务</title>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            h1 { margin-bottom: 20px; }
            code { background: #f0f0f0; padding: 2px 5px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>URL转发服务</h1>
          <p>使用方法: <code>/{路径}</code> 将会转发到对应的环境变量配置的URL</p>
          <p>例如: 如果设置了环境变量 <code>baidu=https://www.baidu.com</code>，访问 <code>/baidu</code> 将会转发到百度</p>
          <p>当前可用的转发配置:</p>
          <ul>
            ${Object.keys(process.env)
              .filter(key => process.env[key].startsWith('http'))
              .map(key => `<li><code>/${key}</code> → <code>${process.env[key]}</code></li>`)
              .join('')}
          </ul>
        </body>
      </html>
    `);
  }
  
  // 检查环境变量中是否有对应的转发配置
  const targetUrl = process.env[path];
  
  if (!targetUrl) {
    return res.status(404).send(`
      <html>
        <head>
          <title>404 - 转发配置不存在</title>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>404 - 转发配置不存在</h1>
          <p>未找到路径 <code>/${path}</code> 的转发配置。</p>
          <p><a href="/">返回首页</a> 查看可用的转发配置。</p>
        </body>
      </html>
    `);
  }
  
  // 如果目标URL不是以http开头，返回错误
  if (!targetUrl.startsWith('http')) {
    return res.status(500).send(`
      <html>
        <head>
          <title>500 - 转发配置错误</title>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>500 - 转发配置错误</h1>
          <p>路径 <code>/${path}</code> 的转发配置不是有效的URL。</p>
          <p><a href="/">返回首页</a> 查看可用的转发配置。</p>
        </body>
      </html>
    `);
  }
  
  // 执行重定向
  res.redirect(targetUrl);
}; 