---
category: display
title: Segmented
subtitle: 分段控制器
label: new
---

<alert>分段控制器组件。</alert>

## 何时使用
用于展示多个选项并允许用户选择其中单个选项；当切换选中的选项时，关联区域的内容会发生变化。

## 模块导入
```ts
import { ThySegmentedModule } from "ngx-tethys/segmented";
```

## 基本使用
```html
<thy-segmented [thyOptions]="options" (thyOptionSelect)="selectedOptionChange($event)"></thy-segmented>
```

展示效果：
<example name="thy-segmented-basic-example" />




## 大小
目前可传的大小有: 'xs' | 'sm' | 'md' | 'default'，默认为 'default'。
- `default: 36px`
- `md: 32px`
- `sm: 28px`
- `xs: 24px`

展示效果：
<example name="thy-segmented-size-example" />



## 图标和文本组合
Segmented 选项带有 Icon。
<example name="thy-segmented-with-icon-example" />

## 仅有图标
Segmented 选项中只设置 Icon。
<example name="thy-segmented-only-icon-example" />


## 模式
可传的两种模式分别为: 'block' | 'adaptive'，默认为'block'。
- block: 将其宽度适应父元素的宽度。
- adaptive: 根据文字的多少自适应宽度。

展示效果：
<example name="thy-segmented-mode-example" />


## 不可用
Segmented 不可用。
<example name="thy-segmented-disabled-example" />

## 自定义模板
可以通过`thyLabelTemplate`传入自定义模板。
<example name="thy-segmented-template-example" />