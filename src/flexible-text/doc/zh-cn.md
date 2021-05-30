---
category: display
title: FlexibleText
subtitle: 文本提示
---

<div class="dg-alert dg-alert-info">超出容器的文本缩略为“...”, 并用Tooltip显示全部内容</div>

## 何时使用

文本显示样式，用于行内元素，单行显示文本，溢出显示 ...

## 模块导入
```ts
import { ThyFlexibleTextModule } from "ngx-tethys/flexible-text";
```

## 如何使用
基本的使用如下：
```html
<thy-flexible-text [thyTooltipContent]="showTextComponent" style="width:500px">
  New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users
</thy-flexible-text>
```
展示效果如下：
<example name="thy-flexible-text-basic-example" />


## thyFlexibleText 指令
指令使用如下：
```html
<span thyFlexibleText [thyTooltipContent]="showTextDirective" style="width:500px">
    New platforms are providing creators with a chance
         bypass pirate sites and platform rules, and connect directly with users</span>
```
展示效果如下：

<example name="thy-flexible-text-directive-example" />
