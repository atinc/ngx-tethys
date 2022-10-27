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
`layout`包含多个子布局组件：
- `thy-layout`: 布局容器组件，内部可以嵌套
- `thy-header`: 头部布局容器组件，内部可以嵌套任何元素，只能放在`thy-layout`中
- `thy-sidebar`: 侧边栏，内部可嵌套任何元素，只能放在`thy-layout`中
- `thy-content`: 内容布局组件，内部可以嵌套`thy-content-section`、`thy-content-main`等任何元素，只能放在`thy-layout`中，内容充满整个屏幕剩余高度
- `thy-content-section`: 内容块区域组件，内部可以嵌套任何元素，只能放在`thy-content`中
- `thy-content-main`: 内容主区域，内部可以嵌套任何元素，只能放在`thy-content`中，内容充满整个屏幕剩余高度

> 注意：所有布局采用`flex`实现，请注意<a href="http://caniuse.com/#search=flex" target="_blank">浏览器兼容性</a>问题。


<examples />
