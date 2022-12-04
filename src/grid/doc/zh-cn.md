---
category: layout
title: Grid
subtitle: 栅格
label: new
---

<alert>基于 CSS Grid 实现的响应式栅格布局组件。</alert>

## 何时使用
可用于搭建常见的网页布局、响应式布局；也可用于一般的表格式布局场景，例如：表单内容布局、详细信息展示等。

## 模块导入
```ts
import { ThyGridModule } from 'ngx-tethys/grid'
```

## 基本使用
```html
<thy-grid thyCols="4" thyGap="8">
  <thy-grid-item>
    <div class="light-blue"></div>
  </thy-grid-item>
  <div thyGridItem class="blue"></div>
  <div thyGridItem class="light-blue"></div>
  <div thyGridItem class="blue"></div>
</thy-grid>
```

展示效果：
<example name="thy-grid-basic-example" />


## 间隔
- `thyGap` 设置水平和垂直的间隔。
- `thyXGap` 单独设置水平间隔。
- `thyYGap` 单独设置垂直间隔。

<example name="thy-grid-gap-example" />


## 跨列
`thySpan` 设置栅格项的占位列数，值为 0 时会隐藏该栅格项。
<example name="thy-grid-span-example" />


## 偏移
<example name="thy-grid-offset-example" />


## 响应式列数
有两种响应方式，默认值为 `self`。
- `self`：根据grid的自身宽度进行响应式布局。
- `screen`：根据屏幕断点`xs: 0, s: 640, m: 1024, l: 1280, xl: 1536, xxl: 1920`进行响应式布局。

<example name="thy-grid-responsive-example" />


## 响应式栅格项
支持响应式跨列，支持响应式左偏移。
<example name="thy-grid-item-responsive-example" />


## 折叠
折叠在响应式布局下依然生效。
<example name="thy-grid-collapse-example" />


## 设置CSS原生样式值
支持栅格项通过 thyGridColum 或 thyGridRow 设置原生样式值。
<example name="thy-grid-use-style-value-example" />


## 旧版栅格
- 旧版栅格组件是以 `24 栅格` 布局实现的，具体可详见 `示例` 和 `API`。

- `thyRow` 中提供了一个 `thyGutter` 属性，用于设置栅格之间的间隔。

- `thyCol` 中提供了一个 `thySpan` 属性，用于设置该栅格的占位格数，最大为 `24`。

- 需要注意的是，必须在 `thyRow` 中嵌套 `thyCol`。

```html
<div thyRow [thyGutter]="30">
  <div thyCol [thySpan]="12"></div>
  <div thyCol [thySpan]="12"></div>
</div>
```

<example name="thy-legacy-grid-example" />
