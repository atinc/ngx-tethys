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

## API 模型

| 参数 | 含义 | 取值 |
|------|------|------|
| `thyAppearance` | 外观 | `fill`（默认）/ `outline` / `link` |
| `thyButton` | 颜色 | `default` / `primary`（默认）/ `info` / `warning` / `danger` / `success` |

生成的 class：

- `fill` → `btn-{type}`
- `outline` → `btn-outline-{type}`
- `link` → `btn-link-{type}`

## 按钮种类
在 Worktile Design 中，有四种按钮:

- 主按钮（fill）：用于重要操作，一个操作区域只能有一个主按钮，常用于添加，保存
- 线框按钮（outline）：用于视图，审批状态
- 按钮链接（link）：用于次要或外链的操作，比如 `取消`（`thyButton="default" thyAppearance="link"`）
- 按钮图标：用于工具栏操作

## 基本使用
推荐使用指令写法，写在原生 `button` 上。禁用时使用原生 `disabled`。
```html
<button thyButton="default">Default</button>
<button thyButton="primary">Primary</button>
<button thyButton="primary" disabled>Primary</button>
```
<example name="thy-button-basic-example"></example>

## 按钮链接
```html
<button thyButton="default" thyAppearance="link">Cancel</button>
<button thyButton="primary" thyAppearance="link">Primary</button>
<button thyButton="danger" thyAppearance="link">Danger</button>
```
<example name="thy-button-link-example"></example>

## 线框按钮
```html
<button thyButton="default" thyAppearance="outline">Default</button>
<button thyButton="primary" thyAppearance="outline">Primary</button>
```
<example name="thy-button-outline-example"></example>

## 按钮大小
- `default: 36px`， 一般用于表单中的保存和确定。
- `md: 32px`，一般用于页面右上角的新建和编辑
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
