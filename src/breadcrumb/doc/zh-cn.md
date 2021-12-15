---
category: nav
title: Breadcrumb
subtitle: 面包屑
label: lack-doc
---

<alert>面包屑是一种“历史记录”的应用方式，提供返回起始页面的轨迹，帮助用户了解他们在网站中所处的位置。</alert>

## 何时使用

适合层级较深，各层级独立而不交叉的系统。

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
<thy-breadcrumb thyIcon="house">
  <thy-breadcrumb-item><span>首页</span></thy-breadcrumb-item>
  <thy-breadcrumb-item>
    <a href="javascript:;">产品研发部</a>
  </thy-breadcrumb-item>
  <thy-breadcrumb-item>
    <a href="javascript:;">架构</a>
  </thy-breadcrumb-item>
  <thy-breadcrumb-item>
    <a href="javascript:;">基础 <thy-icon thyIconName="angle-down"></thy-icon></a>
  </thy-breadcrumb-item>
</thy-breadcrumb>
```

展示效果如下：
<example name="thy-breadcrumb-basic-example"></example>
