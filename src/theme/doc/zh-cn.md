---
category: general
title: Theme
subtitle: 主题
---

<alert>Theme 主题</alert>
当需要使用主题时。



## 变量设计
目前支持`亮色主题`和`暗黑主题`两套主题颜色。
<example name="thy-theme-color-example"/>

## 基本使用
NGX-TETHYS 使用 CSS 变量来构建主题。支持在 .html、.ts、.scss 等文件中通过`var(--gray-*)`的方式使用主题颜色。
<example name="thy-theme-basic-example"/>

## 动态切换主题
组件库通过`:root`元素上的`theme`属性来设置当前的主题，你只要修改这个属性，即可完成主题的切换。
<example name="thy-theme-switch-example">

## 注意
NGX-TETHYS 使用 CSS 变量来构建主题。不支持使用`rgba`且不支持使用 Sass 的 `color.adjust()`、`color.scale-color()` 等函数对 CSS 变量进行计算。