# MarmaladeCat 的个人主页

使用 HTML、CSS 和原生 JavaScript 制作的响应式静态主页，无需安装前端依赖或运行构建。

- 仓库：https://github.com/MarmaladeCat/marmaladecat.github.io
- 发布后的地址：https://marmaladecat.github.io/

## 本地预览

在项目目录执行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 http://localhost:8000，按 Ctrl+C 停止服务。也可以直接用浏览器打开 `index.html`。

## 修改内容

- `index.html`：整屏首页（含 GitHub 主页图标）与完整博客列表；首屏滚动或点击导航“博客”进入第二屏，可直接排序、折叠分类和阅读文章。
- `home.js`：首屏向下、列表顶部向上均触发快速整屏翻页；列表内部正常滚动，短屏内容溢出时保留自然滚动。
- `projects.html`：独立项目页，用卡片面板展示两个开源项目。
- `about.html`：独立个人介绍页，包含邮箱和 GitHub 联系入口。
- `blog/01-04-openasr.html`：OpenASRInput 与 OpenASRPortal 的介绍文章。
- `blog/index.html`：独立博客列表，以“大类 → 简介卡”组织文章，当前为 OpenASR 分类。
- `blog/01-01-openasr-guide.html`：软件功能、设计架构，以及听写、语音修改、校准、热词与日常管理。
- `blog/01-02-openasr-installation.html`：Windows、Linux、合体包、Docker、首次配置与备份迁移。
- `blog/01-03-openasr-connections.html`：四种云端识别上游、客户端授权、Input 及自定义 API 接入。
- `blog/article.js`：按 H1–H3 生成嵌套目录、补齐标题锚点并高亮当前章节。
- `blog/index.js`：各分类独立按默认顺序、发布日期或更新时间排序，日期支持升降序。
- `blog/images/openasr/`：Input / Portal 1.1.1 实际配置界面截图，使用隔离演示数据。
- `styles.css`：布局、字号和颜色；顶部 `:root` 中可以调整主题色。
- `site.js`：测量导航栏实际高度，让文章目录和锚点跳转避开吸顶导航；随窗口和文字大小变化自动更新。
- `favicon.svg`：浏览器标签页图标。
- `.nojekyll`：让 GitHub Pages 直接发布静态文件。
- `INSPIRATION.md`：个人主页参考与学习笔记。

添加项目时，复制 `projects.html` 中的 `<article class="project-card">`，修改标题、说明和链接。文章文件按 `分组编号-文章序号-名称.html` 命名，两段编号至少两位，例如 `01-02-openasr-installation.html`。分组编号对应 `.blog-category` 的 `data-group`，文章序号对应卡片的 `data-order`，不随日期排序变化。

添加博客时，在 `blog/` 创建文章，并同步更新 `index.html` 第二屏与 `blog/index.html` 对应分类的 `.blog-card-grid`。两处使用同一套样式与排序脚本；首页卡片链接带 `./blog/` 前缀，文章标题用 H4，独立列表用 H3。新主题使用独立 `.blog-category`，并同步更新两处分类导航。

每篇文章使用组内唯一的 `data-order`，标题添加相同的固定序号（如 `01 ·`），文章页标题保持一致。简介卡中的 `time[data-published]` 与 `time[data-updated]` 是排序日期来源：`datetime` 使用 `YYYY-MM-DD`，可见文字同步更新；文章发布日保留，修改内容时更新更新时间及文章页日期。相同日期按固定序号排列，切换日期排序不改变标题序号。新分类复制 `.blog-sort` 控件与 `.sort-status`；无 JavaScript 时隐藏排序控件，保留默认顺序。

分类使用原生 `details.category-disclosure`，默认展开；点击标题或用键盘 Enter / 空格独立切换，折叠后保留名称与篇数，排序选择在重新展开后保留。分类导航会自动展开目标分组。新分类复制完整的 `.blog-category` 结构，同步更新分组 ID、标题 ID、篇数和分类链接；无 JavaScript 时仍可手动展开和折叠。

OpenASR 三篇教程依据 Input / Portal 1.1.1 整理，另保留一篇简短概览，公开内容聚焦这两个开源项目。各篇附参考链接与许可说明。截图来自真实配置页面，未调用付费上游，示例凭据已隐藏。

所有文章使用 `.article-layout`：桌面正文居中，左侧固定三级目录；1100px 以下目录折叠为顶部入口。新增文章复用侧栏的静态锚点列表作为无 JavaScript 回退，加载 `article.js` 后按 H1–H3 自动生成完整目录。章节使用稳定 ID 便于分享；宽表格独立横向滚动，截图可点击查看原图。打开 http://localhost:8000/blog/ 审查分类列表。

首页使用 CSS Scroll Snap，并由 `home.js` 在两屏边界执行 180ms 的快速翻页：首屏向下进入列表，列表顶部向上返回首页，中间不保留停驻位置。触控板同一手势的惯性不会反复翻页，减少动态效果偏好下直接切换；浏览器缩放手势保持原有行为。长列表内部正常滚动，上滑到列表顶部后继续上滑即可返回首页。导航始终可见；在小屏、横屏或放大文字时，内容可以自然超出一屏并继续滚动，避免裁切。无 JavaScript 时仍能通过原生滚动和锚点浏览两屏，其他页面保留正常阅读滚动。

所有页面的主导航吸顶显示，不随滚动收起。首页外框固定在视口内，只有 `.home-pages` 滚动，避免锚点或键盘焦点把整个窗口带离导航。文章页的目录停靠在导航下方，锚点预留导航高度；窄屏导航允许换行但不压缩品牌或截断链接。

## 第一次发布

本地仓库关联的远程地址应为：

```text
git@github.com:MarmaladeCat/marmaladecat.github.io.git
```

确认内容后执行：

```bash
git add index.html projects.html about.html styles.css blog/ favicon.svg .nojekyll .gitignore README.md INSPIRATION.md
git commit -m "Create personal homepage"
git push -u origin main
```

如果 Git 提示缺少提交身份，先在此仓库设置 `git config user.name "你的名字"` 和 `git config user.email "你的提交邮箱"`，再重新提交。

在 GitHub 仓库中打开 **Settings → Pages**：

1. Source 选择 **Deploy from a branch**。
2. Branch 选择 **main**。
3. 文件夹选择 **/ (root)**。
4. 点击 **Save**。
5. 在 **Actions** 中等待 Pages 部署成功，再访问网站。

默认 github.io 域名不需要填写 Custom domain 或配置 DNS。

## 后续更新

修改文件后，提交对应文件并推送；GitHub Pages 会自动重新部署。例如：

```bash
git add index.html styles.css
git commit -m "Update homepage"
git push
```
