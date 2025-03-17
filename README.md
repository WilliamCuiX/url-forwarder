# URL转发服务

一个简单的URL转发服务，可以部署到Vercel，通过环境变量配置转发映射。

## 功能

- 通过环境变量配置URL转发映射
- 访问根路径可以查看所有可用的转发配置
- 简洁的错误页面

## 部署方法

1. Fork或克隆此仓库
2. 在Vercel上导入项目
3. 在Vercel项目设置中添加环境变量，例如：
   - `baidu` = `https://www.baidu.com`
   - `github` = `https://github.com`
   - `google` = `https://www.google.com`

## 使用方法

部署完成后，假设你的域名是`example.com`：

- 访问 `https://example.com/baidu` 将会重定向到百度
- 访问 `https://example.com/github` 将会重定向到GitHub
- 访问 `https://example.com/google` 将会重定向到Google
- 访问 `https://example.com/` 将会显示所有可用的转发配置

## 注意事项

- 环境变量名称只能包含字母、数字和下划线
- 环境变量的值必须以`http://`或`https://`开头
- 转发路径区分大小写
