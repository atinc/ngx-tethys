---
category: display
title: FlexibleText
subtitle: 文本提示
---

<alert>响应式文本提示气泡框</alert>

## 何时使用

根据容器宽度和文字长度决定气泡框是否弹出。当文字超出容器大小时，鼠标移入则显示提示，移出消失。当文字未超出容器时，鼠标移入，不出现气泡提示。

## 模块导入
```ts
import { ThyFlexibleTextModule } from "ngx-tethys/flexible-text";
```

## 如何使用
基本的使用如下：
```html
<span thyFlexibleText [thyTooltipContent]="text" style="width:500px">{{ text }}</span>
```
展示效果如下：
<example name="thy-flexible-text-basic-example" />

