---
category: general
title: Theme
subtitle: 主题
---

<alert>Theme 主题</alert>
当需要使用主题时。

## 原理
组件库使用 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*) 来实现多主题，目前支持`亮色主题`和`暗黑主题`两套主题。


## 变量设计
ngx-tethys 内部 Sass 变量和 CSS 变量共存，并且内置了亮色和暗黑两套色板。
<example name="thy-theme-color-example"/>


## 基本使用
支持在 .scss 文件中直接使用`$gray-*`变量，支持在 .html、.ts、.scss 等文件中通过`var(--gray-*)`获取主题颜色。
<example name="thy-theme-basic-example"/>


## 切换主题
组件库通过`:root`元素上的`theme`属性来设置当前的主题，你只要修改这个属性，即可完成主题的切换。
<example name="thy-theme-switch-example">

## 注意
ngx-tethys 使用 CSS 变量来构建主题。不支持使用`rgba`且不支持使用 Sass 的 `color.adjust()`、`color.scale-color()` 等函数对 CSS 变量进行计算。