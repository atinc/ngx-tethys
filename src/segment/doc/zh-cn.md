---
category: display
title: Segment
subtitle: 分段控制器
label: new
---

<alert>分段控制器组件。</alert>

## 何时使用
用于展示多个选项并允许用户选择其中单个选项；当切换选中的选项时，关联区域的内容会发生变化。

## 模块导入
```ts
import { ThySegmentModule } from "ngx-tethys/segment";
```

## 基本使用
```html
<thy-segment (thySelectChange)="selectedChange($event)">
    <thy-segment-item thyValue="member">成员</thy-segment-item>
    <thy-segment-item thyValue="department">部门</thy-segment-item>
    <thy-segment-item thyValue="group">用户组</thy-segment-item>
</thy-segment>
```

展示效果：
<example name="thy-segment-basic-example" />




## 大小
目前可传的大小有: 'xs' | 'sm' | 'md' | 'default'，默认为 'default'。
- `default: 36px`
- `md: 32px`
- `sm: 28px`
- `xs: 24px`

展示效果：
<example name="thy-segment-size-example" />





## 模式
可传的两种模式分别为: 'block' | 'inline'，默认为'block'。
- block: 将其宽度适应父元素的宽度。
- inline: 根据文字的多少自适应宽度。

展示效果：
<example name="thy-segment-mode-example" />


## 禁用
<example name="thy-segment-disabled-example" />

## 自定义模板
<example name="thy-segment-template-example" />