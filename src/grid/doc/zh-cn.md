---
category: layout
title: Grid
subtitle: 栅格
---
<alert>响应式栅格布局组件。</alert>

## 何时使用

栅格布局，一般应用于表格式的布局场景，例如：表单内容布局、详细信息展示等。

## 模块导入

```ts
import { ThyGridModule } from 'ngx-tethys/grid'
```

## 组件概述

- 该组件是以 `24 栅格` 布局实现的，具体可详见 `示例` 和 `API`

- 在 `ThyGridModule` 模块中包含了 `thyRow` 和 `thyCol` 两个属性型指令

- 需要注意的是，必须在 `thyRow` 中嵌套 `thyCol`

## 基本使用

- `thyRow` 中提供了一个 `thyGutter` 属性，用于设置栅格之间的间隔

- `thyCol` 中提供了一个 `thySpan` 属性，用于设置该栅格的占位格数，最大为 `24`

```html
<div thyRow [thyGutter]="30">
  <div thyCol [thySpan]="12"></div>
  <div thyCol [thySpan]="12"></div>
</div>
```

<example name="thy-grid-basic-example" />
