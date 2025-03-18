#!/bin/bash

# 示例1: 简单URL格式
export simple_url="https://example.com"
# 注意：简单格式下，链接展示页面只会显示路径名称"simple_url"，使用默认图标

# 示例2: JSON格式配置，包含名称、URL、描述和图标
# 图标可以使用Bootstrap图标类名，完整图标列表: https://icons.getbootstrap.com/
export adspower='{
  "name": "AdsPower浏览器",
  "url": "https://share.adspower.net/WilliamSays",
  "description": "专业指纹浏览器，帮助您轻松应对各种指纹识别",
  "icon": "bi-globe",
  "animation": "pulse-anim"
}'

export kookeey='{
  "name": "Kookeey海外代理",
  "url": "https://www.kookeey.com/?aff=73679577",
  "description": "稳定高速的海外代理IP服务，支持多国家地区",
  "icon": "bi-hdd-network"
}'

export pingme='{
  "name": "PingMe接码",
  "url": "https://pingmeapp.net/#download",
  "description": "好用的接码App，邀请码HOSEVGM可免费获取0.2 Coins话费",
  "icon": "bi-phone"
}'

export wildcard='{
  "name": "WildCard虚拟卡",
  "url": "https://yeka.ai/i/WILLIAMSAY",
  "description": "全球虚拟信用卡服务，支持多种主流支付方式",
  "icon": "bi-credit-card",
  "animation": "pulse-anim"
}'

export parallels='{
  "name": "Parallels Desktop",
  "url": "https://prf.hn/l/G9JZNJO",
  "description": "最强大的Mac虚拟机软件，7折优惠链接",
  "icon": "bi-pc-display"
}'

# 使用图片URL作为图标
export youtube='{
  "name": "我的YouTube频道",
  "url": "https://youtube.com/@WilliamSays",
  "description": "欢迎订阅我的YouTube频道，获取更多实用工具和技巧",
  "icon": "https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144.png",
  "animation": "pulse-anim"
}'

# 使用base64编码的图片作为图标
export base64icon='{
  "name": "Base64图标示例",
  "url": "https://example.com",
  "description": "这是使用base64编码图片作为图标的示例",
  "icon": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSIjM2I4MmY2IiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTAtMTRjLTMuMzEgMC02IDIuNjktNiA2czIuNjkgNiA2IDYgNi0yLjY5IDYtNi0yLjY5LTYtNi02em0wIDEwYy0yLjIxIDAtNC0xLjc5LTQtNHMxLjc5LTQgNC00IDQgMS43OSA0IDQtMS43OSA0LTQgNHoiPjwvcGF0aD48L3N2Zz4=",
  "animation": "pulse-anim"
}'

# 启动服务
echo "环境变量已设置，现在可以启动服务: node start.js" 