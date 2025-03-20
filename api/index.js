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
  
  // 处理links页面请求
  if (cleanPath === 'links') {
    const linksTemplate = readTemplate('links.html');
    if (!linksTemplate) {
      return res.status(500).send('Error loading links template');
    }
    
    // 系统环境变量前缀，这些变量不应该显示
    const systemPrefixes = [
      'NODE_', 'npm_', 'VERCEL_', 'AWS_', 'HOMEBREW_', 'TS_', 'PATH', 'HOME',
      'USER', 'LANG', 'SHELL', 'TERM', 'SSH', 'DISPLAY', 'XDG_', 'EDITOR', 'GIT_',
      'DYLD_', 'TMPDIR', 'LSCOLORS', 'ZSH', 'PAGER', 'LESS', 'PWD', 'LC_', '_'
    ];
    
    // 准备URL链接列表，排除系统环境变量
    const linkItems = Object.keys(process.env)
      .filter(key => {
        // 必须有值且是字符串
        if (!process.env[key] || typeof process.env[key] !== 'string') return false;
        
        // 必须以path_开头
        if (!key.startsWith('path_')) return false;
        
        return true;
      })
      .map(key => {
        const value = process.env[key].trim();
        const pathKey = key.replace('path_', '');  // 移除path_前缀
        
        // 尝试解析为JSON
        try {
          if (value.startsWith('{') || value.startsWith("'") || value.startsWith('"')) {
            // 去除可能存在的外层引号
            let cleanedValue = value;
            if (cleanedValue.startsWith("'") && cleanedValue.endsWith("'")) {
              cleanedValue = cleanedValue.slice(1, -1);
            } else if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
              cleanedValue = cleanedValue.slice(1, -1);
            }
            // 规范化JSON字符串，去除可能的空白和换行符
            cleanedValue = cleanedValue.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
            const jsonData = JSON.parse(cleanedValue);
            return {
              path: pathKey,  // 使用去掉path_前缀的key
              name: jsonData.name || pathKey,
              url: jsonData.url,
              description: jsonData.description || '',
              icon: jsonData.icon || '',
              animation: jsonData.animation || '',
              order: jsonData.order || 999
            };
          }
        } catch (e) {
          console.error(`Error parsing JSON for ${key}:`, e);
        }
        
        // 如果不是JSON或解析失败，使用简单的URL格式
        return {
          path: pathKey,  // 使用去掉path_前缀的key
          name: pathKey,
          url: value,
          description: '',
          icon: '',
          animation: '',
          order: 999
        };
      })
      .filter(item => item.url && item.url.startsWith('http')) // 确保URL有效
      .sort((a, b) => a.order - b.order); // 按order字段排序，从小到大
    
    // 渲染模板
    const rendered = renderTemplate(linksTemplate, {
      LINK_ITEMS: JSON.stringify(linkItems),
      CURRENT_YEAR: new Date().getFullYear().toString()
    });
    
    return res.status(200).send(rendered);
  }
  
  // 如果路径为空，返回使用说明
  if (!cleanPath) {
    const homeTemplate = readTemplate('home.html');
    if (!homeTemplate) {
      return res.status(500).send('Error loading home template');
    }
    
    // 系统环境变量前缀，这些变量不应该显示
    const systemPrefixes = [
      'NODE_', 'npm_', 'VERCEL_', 'AWS_', 'HOMEBREW_', 'TS_', 'PATH', 'HOME',
      'USER', 'LANG', 'SHELL', 'TERM', 'SSH', 'DISPLAY', 'XDG_', 'EDITOR', 'GIT_',
      'DYLD_', 'TMPDIR', 'LSCOLORS', 'ZSH', 'PAGER', 'LESS', 'PWD', 'LC_', '_'
    ];
    
    // 准备URL配置列表
    const urlConfigs = Object.keys(process.env)
      .filter(key => {
        // 必须有值且是字符串
        if (!process.env[key] || typeof process.env[key] !== 'string') return false;
        
        // 必须是HTTP链接或JSON格式
        if (!process.env[key].startsWith('http') && !process.env[key].startsWith('{')) return false;
        
        // 排除描述变量
        if (key.endsWith('_DESC')) return false;
        
        // 排除系统环境变量
        for (const prefix of systemPrefixes) {
          if (key.startsWith(prefix)) return false;
        }
        
        return true;
      })
      .map(key => {
        const value = process.env[key];
        let url = value;
        let name = key;
        let description = '';
        let order = 999; // 默认排序值
        
        // 尝试解析JSON格式
        try {
          if (value.trim().startsWith('{')) {
            // 规范化JSON字符串，去除可能的空白和换行符
            const cleanedValue = value.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
            const jsonData = JSON.parse(cleanedValue);
            url = jsonData.url;
            name = jsonData.name || key;
            description = jsonData.description || '';
            order = jsonData.order || 999; // 提取排序值
          }
        } catch (e) {
          console.error(`Error parsing JSON for ${key}:`, e);
        }
        
        const descriptionHtml = description ? `<div class="text-sm text-gray-300 mt-1">${description}</div>` : '';
        
        return {
          html: `<li><i class="bi bi-link-45deg text-blue-400"></i> <code>/${key}</code> → <strong>${name}</strong> <code>${url}</code>${descriptionHtml}</li>`,
          order: order // 添加排序字段
        };
      })
      .sort((a, b) => a.order - b.order) // 按order字段排序
      .map(item => item.html) // 提取HTML内容
      .join('') || '<li><i class="bi bi-exclamation-triangle text-yellow-400"></i> 暂无配置</li>';
    
    // 渲染模板
    const rendered = renderTemplate(homeTemplate, {
      URL_CONFIGS: urlConfigs,
      CURRENT_YEAR: new Date().getFullYear().toString()
    });
    
    return res.status(200).send(rendered);
  }
  
  // 检查环境变量中是否有对应的转发配置
  const targetVar = process.env[cleanPath] || process.env[`path_${cleanPath}`];
  
  if (!targetVar) {
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
  
  // 提取目标URL
  let targetUrl = targetVar;
  
  // 如果是JSON格式，解析并提取URL
  try {
    if (targetVar.trim().startsWith('{') || targetVar.trim().startsWith("'") || targetVar.trim().startsWith('"')) {
      // 去除可能存在的外层引号
      let cleanedValue = targetVar.trim();
      if (cleanedValue.startsWith("'") && cleanedValue.endsWith("'")) {
        cleanedValue = cleanedValue.slice(1, -1);
      } else if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
        cleanedValue = cleanedValue.slice(1, -1);
      }
      // 规范化JSON字符串，去除可能的空白和换行符
      cleanedValue = cleanedValue.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      const jsonData = JSON.parse(cleanedValue);
      targetUrl = jsonData.url;
    }
  } catch (e) {
    console.error(`Error parsing JSON for ${cleanPath}:`, e);
  }
  
  // 如果目标URL不是以http开头，返回错误
  if (!targetUrl || !targetUrl.startsWith('http')) {
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