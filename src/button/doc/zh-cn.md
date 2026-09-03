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

- 主按钮（fill）：用于重要操作，一个操作区域只能有一个主按钮，常用于添加，保存
- 线框按钮（outline）：用于视图，审批状态
- 按钮链接（link）：用于次要或外链的操作，比如 `取消`

| `thyAppearance` | `thyButton` | class |
| --- | --- | --- |
| `fill` | `{type}` | `btn-{type}` |
| `outline` | `{type}` | `btn-outline-{type}` |
| `link` | `{type}` | `btn-link-{type}` |

## Appearance
```html
<button thyButton="primary" thyAppearance="fill">Primary</button>
<button thyButton="primary" thyAppearance="outline">Primary</button>
<button thyButton="primary" thyAppearance="link">Primary</button>
```
<example name="thy-button-appearance-example"></example>

## Type
推荐使用指令写法，写在原生 `button` 上。
```html
<button thyButton="default">Default</button>
<button thyButton="primary">Primary</button>
```
<example name="thy-button-type-example"></example>

## Disabled
指令写法使用原生 `disabled`；`thy-button` 组件使用 `thyDisabled`。
```html
<button thyButton="primary" disabled>Primary</button>
```
<example name="thy-button-disabled-example"></example>

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
