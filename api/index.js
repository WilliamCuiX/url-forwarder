// forward-url.js
// URL转发服务，通过环境变量配置转发映射
const fs = require('fs');
const path = require('path');

// 读取模板文件
function readTemplate(templateName) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'templates', templateName), 'utf8');
  } catch (error) {
    console.error(`Error reading template ${templateName}:`, error);
    return null;
  }
}

// 替换模板中的变量
function renderTemplate(template, variables) {
  let rendered = template;
  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return rendered;
}

module.exports = (req, res) => {
  // 获取请求路径，确保正确处理根路径
  const reqPath = req.url.split('?')[0];
  const cleanPath = reqPath === '/' ? '' : reqPath.substring(1);
  
  // 处理CSS文件请求
  if (reqPath.endsWith('.css')) {
    try {
      const cssPath = path.join(process.cwd(), reqPath);
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      res.setHeader('Content-Type', 'text/css');
      return res.status(200).send(cssContent);
    } catch (error) {
      console.error('Error serving CSS file:', error);
      return res.status(404).send('CSS file not found');
    }
  }
  
  // 如果路径为空，返回使用说明
  if (!cleanPath) {
    const homeTemplate = readTemplate('home.html');
    if (!homeTemplate) {
      return res.status(500).send('Error loading home template');
    }
    
    // 准备URL配置列表
    const urlConfigs = Object.keys(process.env)
      .filter(key => 
        process.env[key] && 
        typeof process.env[key] === 'string' && 
        process.env[key].startsWith('http') &&
        !key.includes('HOMEBREW') && 
        !key.includes('npm_config') &&
        !key.startsWith('VERCEL_') &&
        !key.startsWith('NODE_') &&
        !key.startsWith('AWS_')
      )
      .map(key => `<li><i class="bi bi-link-45deg text-blue-400"></i> <code>/${key}</code> → <code>${process.env[key]}</code></li>`)
      .join('') || '<li><i class="bi bi-exclamation-triangle text-yellow-400"></i> 暂无配置</li>';
    
    // 渲染模板
    const rendered = renderTemplate(homeTemplate, {
      URL_CONFIGS: urlConfigs,
      CURRENT_YEAR: new Date().getFullYear().toString()
    });
    
    return res.status(200).send(rendered);
  }
  
  // 检查环境变量中是否有对应的转发配置
  const targetUrl = process.env[cleanPath];
  
  if (!targetUrl) {
    const notFoundTemplate = readTemplate('404.html');
    if (!notFoundTemplate) {
      return res.status(404).send('404 - Not Found');
    }
    
    // 渲染模板
    const rendered = renderTemplate(notFoundTemplate, {
      PATH: `/${cleanPath}`
    });
    
    return res.status(404).send(rendered);
  }
  
  // 如果目标URL不是以http开头，返回错误
  if (!targetUrl.startsWith('http')) {
    const errorTemplate = readTemplate('500.html');
    if (!errorTemplate) {
      return res.status(500).send('500 - Server Error');
    }
    
    // 渲染模板
    const rendered = renderTemplate(errorTemplate, {
      PATH: `/${cleanPath}`
    });
    
    return res.status(500).send(rendered);
  }
  
  // 执行重定向
  res.redirect(targetUrl);
}; 