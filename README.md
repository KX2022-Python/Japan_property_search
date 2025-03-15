# 日本房源搜索网站

这是一个极简风格的日本房源搜索网站，能够整合多个日本房产信息网站的数据，支持列表视图和地图视图两种方式浏览房源。

## 功能特点

- **极简设计**：简洁清晰的用户界面，专注于房源信息的展示
- **双重视图**：支持列表视图和地图视图，满足不同用户的需求
- **多源整合**：整合日本多个主流房产网站的数据
- **房源去重**：自动识别并合并来自不同网站的相同房源
- **灵活筛选**：提供多种筛选条件，如价格、面积、房型等
- **响应式设计**：适配不同尺寸的设备，包括手机和平板电脑

## 数据来源

本站整合了以下日本房产网站的数据：
- HOMES
- SUUMO
- at home
- カウカモ
- LIFULL HOME'S
- Nifty不動産
- mansion-market.com
- マンションノート
- カナリー
- Yahoo!不動産
- いえらぶ
- ホームメイト
- ピタットハウス
- いい部屋ネット
- アパマンショップ
- CHINTAI

## 如何使用

### 安装依赖

本项目使用ES模块，无需安装npm依赖。只需在本地运行简单的HTTP服务器即可。

```bash
# 使用Python的简易HTTP服务器
python -m http.server

# 或者使用Node.js的http-server
npx http-server
```

### 配置地图

为了使地图功能正常工作，请在`index.html`文件中替换Google Maps API密钥：

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" defer></script>
```

将`YOUR_API_KEY`替换为有效的Google Maps API密钥。

## 开发说明

### 项目结构

```
/
├── index.html          # 主HTML文件
├── styles/             # 样式文件
│   └── main.css        # 主样式表
├── src/                # 源代码
│   ├── index.js        # 入口文件
│   ├── App.js          # 主应用组件
│   ├── components/     # UI组件
│   │   ├── Header.js
│   │   ├── FiltersPanel.js
│   │   ├── ListView.js
│   │   ├── MapView.js
│   │   └── PropertyCard.js
│   └── api/            # API服务
│       └── propertiesApi.js
└── README.md           # 项目说明
```

### 技术栈

- React (通过ESM导入，无需构建步骤)
- Google Maps API
- 原生CSS

## 未来改进

- 添加用户注册和登录功能
- 实现房源收藏功能
- 添加更详细的房源信息页面
- 增加房源比较功能
- 添加房源提醒功能
- 优化移动设备上的用户体验

## 许可证

MIT 