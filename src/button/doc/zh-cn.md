---
category: general
title: Button
subtitle: 按钮
order: 10
---

<alert>按钮用于开始一个即时操作。</alert>

## 何时使用
标记了一个（或一组）操作命令，响应用户点击行为，触发相应的事件。

## 模块导入
```ts
import { ThyButtonModule } from "ngx-tethys/button";
```

## 按钮种类
在 Worktile Design 中，按钮由 `thyAppearance` 与 `thyButton` 组合：

- 填充按钮（fill）：有背景色的按钮，默认外观；主操作常用 `primary`，一个操作区域建议只有一个
- 线框按钮（outline）：用于视图，审批状态
- 链接按钮（link）：用于次要或外链的操作，比如 `取消`
- 按钮图标：用于工具栏操作

## 基本使用
推荐使用指令写法，写在原生 `button` 上。禁用时使用原生 `disabled`。
```html
<button thyButton="primary">Primary</button>
<button thyButton="primary" thyAppearance="outline">Primary</button>
<button thyButton="primary" thyAppearance="link">Primary</button>
```
<example name="thy-button-basic-example"></example>

## 填充按钮
<example name="thy-button-fill-example"></example>

## 线框按钮
<example name="thy-button-outline-example"></example>

## 链接按钮
<example name="thy-button-link-example"></example>

## 按钮大小
- `md: 32px`（默认），一般用于表单确定、页面右上角的新建和编辑
- `sm: 28px`，一般用于即时编辑页面的确定按钮，比如详情页的描述编辑或者看板下的新建确定
- `xs: 24px`，一般用于按钮图标，比如子工作项的截止时间和负责人设置等操作图标按钮
- `lg: 44px`，一般用于类似登录注册页面的确定按钮，通常整行展示

<example name="thy-button-size-example"></example>

## 加载
<example name="thy-button-loading-example"></example>

## 块级按钮
<example name="thy-button-block-example"></example>

## 按钮图标
<example name="thy-button-icon-example"></example>

## 图标按钮
<example name="thy-button-btn-icon-example"></example>

## 按钮对
<example name="thy-button-pair-example"></example>

## 按钮组
<example name="thy-button-group-example"></example>
