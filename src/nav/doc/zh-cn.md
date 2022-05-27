---
category: nav
title: Nav
subtitle: 导航
description: 切换不同的组件内容。
---

<alert>切换不同的组件内容。</alert>

## 何时使用

用户需要使用导航在各个页面、各个部分中进行跳转，全局导航会提供全局性的类目和功能，局部导航会收纳和排列网站架构。

## 模块导入
```ts
import { ThyNavModule } from "ngx-tethys/nav";
```
## 基本使用
```html
<thy-nav thyType="primary">
  <a href="javascript:;" thyNavItem thyNavItemActive="true">导航一</a>
  <a href="javascript:;" thyNavItem>导航二</a>
</thy-nav>
```
展示效果：
<example name="thy-nav-basic-example"></example>

## 导航类型
Nav 支持类型：pulled、primary、secondary、thirdly、secondary-divider

primary、secondary、thirdly、secondary-divider 即将被遗弃，会在之后重构导航类型


展示效果：
<example name="thy-nav-type-example"></example>

## 图标导航
<example name="thy-nav-icon-nav-example"></example>

## 导航大小
<example name="thy-nav-size-example"></example>


