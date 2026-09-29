---
type: concept
title: 主题与样式
description: 构建期用带 !default 的 Sass 变量和公开发布的 styles 入口定制颜色，运行期用 html 的 theme 属性和 ThyThemeStore 切换明暗。
tags: [theme, sass, css-variables]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-9580befd62277d5dcc535c53
    resource: repo://docs/guide/theme.md
  - id: openwiki-source-d7379e502b9d927a0920cb5f
    resource: repo://schematics/ng-add/index.ts
  - id: openwiki-source-f4cba6519abd5717a2cc5e67
    resource: repo://site/src/app/app.initializer.ts
  - id: openwiki-source-d1aafc4a7cb23671a30bedaf
    resource: repo://src/core/theme/store.ts
  - id: openwiki-source-a2c92554b62aced54e9db682
    resource: repo://src/package.json
  - id: openwiki-source-f753ce51f73355fa48cb1029
    resource: repo://src/styles/index.scss
  - id: openwiki-source-8370a4e6b7c2c97de7dfb6d1
    resource: repo://src/styles/theme/dark.scss
  - id: openwiki-source-b7cd64e6b69e4d223f079acb
    resource: repo://src/styles/theme/default.scss
  - id: openwiki-source-a158b46845e67e428402f7d9
    resource: repo://src/styles/themes/index.scss
  - id: openwiki-source-22ff3773d3e7e3400633d60b
    resource: repo://src/styles/themes/sky-blue.scss
  - id: openwiki-source-7062bd226797d6993b52fb31
    resource: repo://src/styles/variables.scss
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

样式在编译 Sass 时定下来，明暗则在运行时改 CSS 变量和一份信号。两边不会自动同步。

## 公开发布的样式

`src/package.json` 的 `exports` 只给 Sass 暴露 `ngx-tethys`（即 `styles/index.scss`）、`styles/index`、`styles/variables`、`styles/basic` 和 `styles/*`。`styles/index.scss` 用 `@forward` 收进主题变量、基础模块，以及按钮、表单、选择器等组件的 scss。组件目录里的 scss 会随包拷贝，但没有单独的 export 路径。文档说明从 v13 起不支持直接导入组件内部样式；用 `includePaths` 指到 `node_modules` 可以绕开，路径以后可能变。

`ng add` 把 `node_modules/ngx-tethys/styles/index.scss` 写进应用的 `styles`。

## 构建期变量

`styles/variables.scss` 里的 `$primary`、`$success` 等带 `!default`，默认主色是 `#6698ff`。文档给出的覆盖方式是：

```sass
@use "ngx-tethys/styles/variables.scss" with (
    $primary: #348fe4
);
```

`@use ... with` 只在该模块第一次加载时生效。灰度色写成 `var(--gray-100) !default`，真正的色值在 CSS 变量里，改 Sass 变量换不掉暗色面板背景。

`styles/themes/` 是另一组预设主色，例如湖蓝把 `$primary` 设为 `#6f76fa` 再 `@import` 组件的 theme 片段。这组文件仍用 `@import`，而且没有被 `styles/index.scss` `@forward`。要使用它们，得显式引用 `styles/themes` 下的文件。

## 运行期明暗

`styles/theme/default.scss` 在 `:root` 上定义亮色变量，例如 `--gray-10: #fff`、`--text-color: #333`。`dark.scss` 用 `:root[theme='dark']` 覆盖同一批变量，`--gray-10` 变成 `#2a2e34`。`styles/index.scss` 会转发这两份文件，所以引入总样式后，只要根元素带上 `theme="dark"`，灰度、背景和文字就会切换。`ThyThemeStore` 不会自己写这个属性。

文档站监听 `documentElement` 的 `theme` 属性变化，再调用 `setTheme`。组件若只读 store 的 `isDark`，必须有人调用 `setTheme`，或者像文档站一样把属性同步进 store。`system` 会读 `prefers-color-scheme`，这和 CSS 属性选择器不是同一条路径。`normalizeColor` 用 store 在成对颜色里挑亮色或暗色，不读 DOM 属性。

## 相关页面

- [组件包结构](../architecture/component-package.md)说明组件样式如何被转发进总入口。
- [核心服务与全局配置](core-services.md)说明 `ThyThemeStore` 的信号。
- [在应用中接入](../workflows/adopt.md)说明 `ng add` 写入样式的位置。
- [脚手架与版本迁移](../integrations/schematics.md)说明样式选择器迁移。
