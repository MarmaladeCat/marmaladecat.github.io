# MarmaladeCat 的个人主页

使用 HTML 和 CSS 制作的响应式静态主页，无需安装前端依赖或运行构建。

- 仓库：https://github.com/MarmaladeCat/marmaladecat.github.io
- 发布后的地址：https://marmaladecat.github.io/

## 本地预览

在项目目录执行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 http://localhost:8000，按 Ctrl+C 停止服务。也可以直接用浏览器打开 `index.html`。

## 修改内容

- `index.html`：整屏首页与博客列表，向下滚动切换到第二屏，也可以使用导航或屏幕底部的切换链接。
- `projects.html`：独立项目页，用卡片面板展示两个开源项目。
- `about.html`：独立个人介绍页，包含邮箱和 GitHub 联系入口。
- `blog/openasr.html`：OpenASRInput 与 OpenASRPortal 的介绍文章。
- `styles.css`：布局、字号和颜色；顶部 `:root` 中可以调整主题色。
- `favicon.svg`：浏览器标签页图标。
- `.nojekyll`：让 GitHub Pages 直接发布静态文件。
- `INSPIRATION.md`：个人主页参考与学习笔记。

添加项目时，复制 `projects.html` 中的 `<article class="project-card">`，修改标题、说明和链接。添加博客时，在 `blog/` 创建文章，并在 `index.html` 的 `.post-list` 中添加 `.post-panel`。

首页通过 CSS Scroll Snap 实现整屏切换，无需 JavaScript。导航始终可见；在小屏、横屏或放大文字时，内容可以自然超出一屏并继续滚动，避免裁切。其他页面保留正常阅读滚动。

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
