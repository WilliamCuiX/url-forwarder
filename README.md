# URL Forwarder

<div align="center">

![URL Forwarder Logo](https://img.shields.io/badge/URL-Forwarder-3a86ff?style=for-the-badge&logo=vercel&logoColor=white)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WilliamCuiX/url-forwarder&project-name=my-url-forwarder&repository-name=my-url-forwarder)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.x-brightgreen?style=flat-square)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=flat-square&logo=vercel)](https://vercel.com)

</div>

一个高效、轻量级的URL转发服务，通过环境变量轻松配置转发映射。部署在Vercel上，无需服务器，零维护成本。

## ✨ 特性

- 🚀 **零配置部署** - 一键部署到Vercel，无需服务器
- 🔗 **简单易用** - 通过环境变量轻松配置URL转发映射
- 🎨 **美观界面** - 现代化设计的使用说明和错误页面
- 🔒 **安全可靠** - 基于Vercel的可靠基础设施
- 📱 **响应式设计** - 完美适配各种设备屏幕
- ⚡ **高性能** - 基于Vercel边缘网络，全球快速访问

## 🚀 部署方法

### 方法一：Fork + 部署（推荐）

这种方法可以让您在未来轻松获取原始仓库的更新：

1. 首先 [Fork 这个仓库](https://github.com/WilliamCuiX/url-forwarder/fork) 到您自己的GitHub账户
2. 在您的Fork仓库页面点击"Code"按钮，复制仓库URL
3. 访问 [Vercel导入页面](https://vercel.com/new)，选择"Import Git Repository"
4. 粘贴您的Fork仓库URL，按照提示完成部署

这种方式的优势：
- 您可以定期从原始仓库拉取更新
- 可以根据自己的需求自定义代码
- 完全控制您的部署环境

### 方法二：直接部署（快速）

如果您只想快速部署而不需要获取未来更新，可以直接点击下方按钮：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WilliamCuiX/url-forwarder&project-name=my-url-forwarder&repository-name=my-url-forwarder)

> 注意：使用此方法会在您的GitHub账户中创建一个新的仓库，并将其部署到Vercel。

### 方法三：手动部署

1. 克隆此仓库或您的Fork仓库
2. 在Vercel上导入项目
3. 在Vercel项目设置中添加环境变量

## ⚙️ 配置方法

在Vercel项目设置中添加环境变量，格式为：

```
<路径名称>=<目标URL>
```

例如：

- `baidu` = `https://www.baidu.com`
- `github` = `https://github.com`
- `google` = `https://www.google.com`

## 📖 使用方法

部署完成后，假设你的域名是`example.com`：

- 访问 `https://example.com/baidu` 将会重定向到百度
- 访问 `https://example.com/github` 将会重定向到GitHub
- 访问 `https://example.com/google` 将会重定向到Google
- 访问 `https://example.com/` 将会显示所有可用的转发配置

## 🔍 使用场景

- 个人短链接服务
- 社交媒体个人主页链接集合
- 企业内部常用链接导航
- 临时重定向服务
- 营销活动链接管理

## ⚠️ 注意事项

- 环境变量名称只能包含字母、数字和下划线
- 环境变量的值必须以`http://`或`https://`开头
- 转发路径区分大小写
- Vercel免费计划有一定的限制，请查阅[Vercel文档](https://vercel.com/docs/concepts/limits/overview)

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 本地运行
npm start
```

## 📄 许可证

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件

## 🤝 贡献

欢迎提交问题和功能请求！如果您想贡献代码，请提交PR。

## 📞 联系方式

如有任何问题，请通过GitHub Issues联系我们。

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/WilliamCuiX">WilliamCui</a></sub>
</div>
