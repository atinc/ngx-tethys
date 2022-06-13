---
category: nav
title: Breadcrumb
subtitle: 面包屑
---

<alert>显示当前页面的路径，并可快速返回之前的任意页面。</alert>

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户当前处于什么层级时；
- 用户需要导航至与指定层级的任意页面时。

## 模块导入

```ts
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
```

## 组件概述

`breadcrumb`包含：

- `thy-breadcrumb`: 布局容器组件，容纳全程路径。
- `thy-breadcrumb-item`: 路径节点，只能放在`thy-breadcrumb`中。

## 如何使用

最基本的使用如下：

```html
<thy-breadcrumb>
  <thy-breadcrumb-item><span>Home</span></thy-breadcrumb-item>
  <thy-breadcrumb-item>
    <a href="javascript:;">Applications</a>
  </thy-breadcrumb-item>
  <thy-breadcrumb-item>
    Application 1
  </thy-breadcrumb-item>
</thy-breadcrumb>
```

展示效果如下：
<example name="thy-breadcrumb-basic-example"></example>

## 带图标的

<example name="thy-breadcrumb-icon-example"></example>


## 分割线

<example name="thy-breadcrumb-separator-example"></example>
