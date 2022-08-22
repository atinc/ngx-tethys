---
category: general
title: Action
subtitle: 操作
label: new
---

<alert>另一个即时操作。</alert>

## 何时使用
当需要使用图标或者图标加文字进行操作且非按钮场景使用。

## 模块导入
```ts
import { ThyActionModule } from "ngx-tethys/action";
```

## 基本使用

支持组件和指令两种使用方式:
```html
<a href="javascript:;" thyAction thyActionIcon="vertical-view-lines"></a>
<a href="javascript:;" thyAction><thy-icon thyIconName="vertical-view-lines"></thy-icon></a>

<thy-action  thyActionIcon="vertical-view-lines"></thy-action>
<thy-action><thy-icon thyIconName="vertical-view-lines"></thy-icon></thy-action>

```
展示效果:
<example name="thy-action-basic-example" />

## 图标和文本组合

```html
<a thyAction thyActionIcon="vertical-view-lines" href="javascript:;"> View</a>
```
展示效果:
<example name="thy-action-text-example" />

## 多个图标组合

展示效果:
<example name="thy-action-group-example" />


## 图标类型
支持 `primary`、`success`、`danger`、`warning` 四种类型，默认 `primary`。

```html
<a thyAction thyType="danger" thyActionIcon="vertical-view-lines" href="javascript:;"> View</a>
```

展示效果：
<example name="thy-action-type-example"/>


## Hover 图标

展示效果:
<example name="thy-action-hover-example" />
