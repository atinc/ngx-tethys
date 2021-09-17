---
category: display
title: Card
subtitle: 卡片
description: 通用的卡片组件。
---
<alert>通用的卡片组件</alert>

## 何时使用

最基础的卡片组件，是一个内容容器，用于文本、照片和单个主题上下文的操作，同类信息聚合形成区块。

## 模块导入
```ts
import { ThyCardModule } from "ngx-tethys/card";
```

## 如何使用
`thy-card`组件需要与`thy-card-header`和`thy-card-content`组件一起配合使用，基本的使用如下：
```html
<thy-card>
    <thy-card-header thyTitle="Card title"> </thy-card-header>
    <thy-card-content>
      Card content<br />
      Card content
    </thy-card-content>
  </thy-card>
```
展示效果：
<example name="thy-card-basic-example" inline>
