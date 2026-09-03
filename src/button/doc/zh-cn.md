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

按钮样式由正交 API 组合（对齐 Ant Design Color × Variant、Semi type × theme、Element Plus type × plain/link）：

| API | 含义 | 取值 |
| --- | --- | --- |
| `thyAppearance` | 外观 | `fill`（默认）/ `outline` / `link` |
| `thyButton` | 类型（颜色） | `default` / `primary` / `info` / `warning` / `danger` / `success` |
| `disabled` / `thyDisabled` | 禁用 | 指令用原生 `disabled`；`thy-button` 组件用 `thyDisabled` |

使用建议：

- **fill**：重要操作，一个区域通常只有一个主按钮（添加、保存）
- **outline**：次要操作、视图与审批状态
- **link**：更次要或取消类操作，常用 `thyButton="default" thyAppearance="link"`

### `thyAppearance` × `thyButton` → class

| `thyAppearance` | `thyButton` | 生成 class |
| --- | --- | --- |
| `fill`（默认） | `{type}` | `btn-{type}` |
| `outline` | `{type}` | `btn-outline-{type}` |
| `link` | `{type}` | `btn-link-{type}` |

```html
<button thyButton="primary">Primary</button>
<button thyButton="primary" thyAppearance="outline">Outline</button>
<button thyButton="default" thyAppearance="link">Cancel</button>
```

## Appearance
`thyAppearance` × 各 `thyButton` 类型矩阵（对标 Ant Design Color & Variant / Semi Theme）。
<example name="thy-button-appearance-example"></example>

## Type
`thyButton` 颜色类型（默认 `fill`），以及常见组合用法。
<example name="thy-button-type-example"></example>

## Disabled
指令写法用原生 `disabled`；组件写法用 `thyDisabled`。
```html
<button thyButton="primary" disabled>Primary</button>
<thy-button thyButton="primary" thyDisabled>Primary</thy-button>
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
