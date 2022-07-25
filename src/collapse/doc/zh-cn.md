---
category: display
title: Collapse
subtitle: 折叠面板
order: 1
---

<div class="dg-alert dg-alert-info">可折叠展开的内容区域。</div>

# 何时使用

对于复杂区域进行分组和隐藏

## 模块导入
```ts
import { ThyCollapseModule } from "ngx-tethys/collapse";
```

## 基本使用
`thy-collapse`组件需要与`thy-collapse-panel`组件一起配合使用，支持主题默认divided，基本的使用如下：
```html
<thy-collapse>
  <thy-collapse-item thyTitle="Title 1" [thyActive]="true">
    Content 1
  </thy-collapse-item>
  <thy-collapse-item thyTitle="Title 2">
    Content 2
  </thy-collapse-item>
  <thy-collapse-item thyTitle="Title 3">
    Content 3
  </thy-collapse-item>
</thy-collapse>

```

<example name="thy-collapse-basic-example">

## 手风琴
只允许展开一个面板项

<example name="thy-collapse-accordion-example">

## 带边框折叠面板

带边框折叠面板，设置 `thyTheme="bordered"`

<example name="thy-collapse-bordered-example">

## 幽灵面板

将折叠面板的背景变成透明且无边框，设置`thyTheme="ghost"`

<example name="thy-collapse-ghost-example">

## 箭头图标
<example name="thy-collapse-arrow-example">

## 自定义

<example name="thy-collapse-custom-example">

## 禁用

<example name="thy-collapse-disabled-example">

## 嵌套

<example name="thy-collapse-tree-example">


