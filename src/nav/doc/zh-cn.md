---
category: nav
title: Nav
subtitle: 导航
description: 为页面、页面内部分布局和功能提供导航的列表。
---

<div class="dg-alert dg-alert-info">为页面、页面内部分布局和功能提供导航的列表。</div>

## 何时使用

用户需要使用导航在各个页面、各个部分中进行跳转，全局导航会提供全局性的类目和功能，局部导航会收纳和排列网站架构。

## 模块导入
```ts
import { ThyNavModule } from "ngx-tethys/nav";
```
## 如何使用
```html
<thy-nav thyType="primary">
  <a href="javascript:;" thyNavLink thyNavLinkActive="true">导航一</a>
  <a href="javascript:;" thyNavLink>导航二</a>
</thy-nav>
```
展示效果：
<example name="thy-nav-basic-example">
