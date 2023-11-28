---
category: layout
title: Layout
subtitle: 布局
---

<alert>整体布局容器组件。</alert>

## 何时使用
整体布局使用，当使用`ngx-tethys`时要求所有的元素都应该在布局组件中。

## 模块导入
```ts
import { ThyLayoutModule } from "ngx-tethys/layout";
```
## 组件概述
`layout`包含多个子布局组件，有组件和指令两种使用方式：
- `thy-layout, [thyLayout]`: 布局容器组件，内部可以嵌套
- `thy-header, [thyHeader]`: 头部布局容器组件，内部可以嵌套任何元素，只能放在`thy-layout` 或`[thyLayout]`中
- `thy-sidebar, [thySidebar]`: 侧边栏，内部可嵌套任何元素，只能放在`thy-layout`或`[thyLayout]`中
- `thy-content, [thyContent]`: 内容布局组件，内部可以嵌套`thy-content-section, [thyContentSection]`、`thy-content-main, [thyContentMain]`等任何元素，只能放在`thy-layout`或`thyLayout`中，内容充满整个屏幕剩余高度
- `thy-content-section, [thyContentSection]`: 内容块区域组件，内部可以嵌套任何元素，只能放在`thy-content`或`thyContent`中
- `thy-content-main, [thyContentMain]`: 内容主区域，内部可以嵌套任何元素，只能放在`thy-content`或`thyContent`中，内容充满整个屏幕剩余高度

> 注意：所有布局采用`flex`实现，请注意<a href="http://caniuse.com/#search=flex" target="_blank">浏览器兼容性</a>问题。

## 如何使用
所有布局组件均支持组件和指令两种使用方式
```html
<thy-layout>
  <thy-header thyTitle="Header"></thy-header>
  <thy-content> Content </thy-content>
</thy-layout>

<div thyLayout>
  <div thyHeader> Header </div>
  <div thyContent> Content </div>
</div>
```