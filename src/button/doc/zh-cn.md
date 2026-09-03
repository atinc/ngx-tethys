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

按钮由两个正交维度组合（对齐 Ant Design Color × Variant、Semi type × theme、库内 Tag/Action 的 Appearance 切片）：

- **`thyAppearance`**：外观 — `fill`（默认）/ `outline` / `link`
- **`thyButton`**：类型（颜色）— `default` / `primary` / `info` / `warning` / `danger` / `success`

使用建议：

- **fill**：重要操作，一个操作区域通常只有一个主按钮（如添加、保存）
- **outline**：次要操作、视图与审批状态
- **link**：更次要或外链操作（如取消）；常用 `thyButton="default" thyAppearance="link"`
- **按钮图标**：用于工具栏操作（见下方图标示例）

### `thyAppearance` × `thyButton` → class

| `thyAppearance` | `thyButton` | 生成 class |
| --- | --- | --- |
| `fill`（默认） | `{type}` | `btn-{type}` |
| `outline` | `{type}` | `btn-outline-{type}` |
| `link` | `{type}` | `btn-link-{type}` |

示例：`thyButton="primary"` → `btn-primary`；`thyButton="primary" thyAppearance="outline"` → `btn-outline-primary`；`thyButton="danger" thyAppearance="link"` → `btn-link-danger`。

## 基本使用
推荐使用指令写法，写在原生 `button` 上。禁用时使用原生 `disabled`。默认 `thyAppearance` 为 `fill`。
```html
<button thyButton="default">Default</button>
<button thyButton="primary">Primary</button>
<button thyButton="primary" disabled>Primary</button>
```
<example name="thy-button-basic-example"></example>

## Appearance
切换 `thyAppearance`，与各 `thyButton` 类型组合预览矩阵（含禁用态）。
```html
<button thyButton="primary" thyAppearance="fill">Primary</button>
<button thyButton="primary" thyAppearance="outline">Primary</button>
<button thyButton="primary" thyAppearance="link">Primary</button>
```
<example name="thy-button-appearance-example"></example>

## 按钮链接
`thyAppearance="link"` 的类型与禁用态。
```html
<button thyButton="default" thyAppearance="link">Cancel</button>
<button thyButton="primary" thyAppearance="link">Primary</button>
<button thyButton="danger" thyAppearance="link">Danger</button>
```
<example name="thy-button-link-example"></example>

## 线框按钮
`thyAppearance="outline"` 的类型、激活态与禁用态。
```html
<button thyButton="default" thyAppearance="outline">Default</button>
<button thyButton="primary" thyAppearance="outline">Primary</button>
```
<example name="thy-button-outline-example"></example>

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
