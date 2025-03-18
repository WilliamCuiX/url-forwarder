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
- 🌈 **精美链接展示** - 提供精美的链接展示页面，适合放在社交媒体简介中
- 🔄 **灵活配置** - 支持JSON格式配置，可自定义名称、图标和描述

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

### 重要提示：绑定自定义域名（国内用户必读）

由于Vercel的默认域名（*.vercel.app）在中国大陆可能无法正常访问，**强烈建议**您绑定自己的自定义域名：

1. 购买一个域名（如通过阿里云、腾讯云等服务商）
2. 在Vercel项目设置中，进入"Domains"选项卡
3. 添加您的自定义域名
4. 按照Vercel提供的说明，在您的域名DNS设置中添加相应的记录
5. 等待DNS生效（通常需要几分钟到几小时）

完成以上步骤后，您就可以通过自己的域名访问服务了。

## ⚙️ 配置方法

### 基本配置（简单URL）

在Vercel项目设置中添加环境变量，格式为：

```
<路径名称>=<目标URL>
```

例如：

- `baidu` = `https://www.baidu.com`
- `github` = `https://github.com`
- `google` = `https://www.google.com`

这种配置方式简单直接，但在链接展示页面中，只会显示路径名称，使用默认图标（蓝色链接图标）。

### 完全自定义配置（JSON格式）

如果需要完全自定义链接的显示方式，可以使用JSON格式：

```
<路径名称>='{"name":"显示名称","url":"目标URL","description":"描述文本","icon":"图标类名或URL"}'
```

例如：

```
github='{"name":"GitHub平台","url":"https://github.com","description":"全球最大的代码托管平台","icon":"bi-github"}'
```

JSON格式支持以下字段：
- `name`: 显示名称（可选，默认使用路径名称）
- `url`: 目标URL（必填）
- `description`: 描述文本（可选）
- `icon`: 图标（可选，默认使用"bi-link-45deg"）
  - 可以是Bootstrap图标类名，如 `bi-github`、`bi-youtube`、`bi-twitter` 等
  - Bootstrap图标完整列表：[https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)
  - 也可以是图片URL，如 `https://example.com/icon.png`
  - 支持base64编码的图片，如 `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`
- `animation`: 动画效果（可选）
  - 可设置为 `pulse-anim` 使卡片有呼吸灯效果
  - 默认为空，无动画效果

> 查看 [examples/setup-env.sh](examples/setup-env.sh) 获取完整示例

## 📖 使用方法

部署完成后，假设你的域名是`example.com`：

- 访问 `https://example.com/baidu` 将会重定向到百度
- 访问 `https://example.com/github` 将会重定向到GitHub
- 访问 `https://example.com/google` 将会重定向到Google
- 访问 `https://example.com/` 将会显示所有可用的转发配置
- 访问 `https://example.com/links` 将会显示精美的链接展示页面

### 链接展示页面

链接展示页面是一个精美的卡片布局页面，特别适合用于：
- 放在YouTube频道简介中
- 放在社交媒体个人主页
- 作为个人导航页面

用户可以一目了然地看到所有链接及其描述，点击卡片即可访问目标URL。

## 🔍 使用场景

- 个人短链接服务
- 社交媒体个人主页链接集合
- 企业内部常用链接导航
- 临时重定向服务
- 营销活动链接管理
- YouTube视频描述链接集合

## ⚠️ 注意事项

- 环境变量名称只能包含字母、数字和下划线
- 环境变量的值必须以`http://`或`https://`开头，或者是有效的JSON字符串
- 转发路径区分大小写
- 使用JSON格式时，确保JSON格式正确
- Vercel免费计划有一定的限制，请查阅[Vercel文档](https://vercel.com/docs/concepts/limits/overview)

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 本地运行
npm start

# 使用示例配置运行
source examples/setup-env.sh && npm start
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
