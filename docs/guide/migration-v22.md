---
title: 22.x 升级指南
path: 'migration-v22'
order: 985
---

<alert>本文档将帮助你从 ngx-tethys 21.x 版本升级到 22.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js ^22.22.3 || ^24.15.0 || >=26.0.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级，这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `22.x` 版本，并修改 package.json 中的依赖版本号
- 会自动把依赖的 CDK 和 Angular 库都升级到 `22.x` 版本，并修改 package.json 中的依赖版本号
- 自动为受影响组件补回 `thySize="lg"`，以保持升级前 36px 的视觉效果。受影响组件包括：`thy-button`、`thy-button-group`、`thy-button-icon`、`thy-input`、`thy-input-group`、`thy-input-search`、`thy-input-number`、`thy-select`、`thy-custom-select`、`thy-native-select`、`thy-tree-select`、`thy-cascader`、`thy-select-control`、`thy-date-picker`、`thy-range-picker`、`thy-month-picker`、`thy-quarter-picker`、`thy-week-picker`、`thy-year-picker`、`thy-time-picker`，以及属性指令形式的 `thyButton`、`thyButtonIcon`、`thyInput`、`thyDatePicker`、`thyRangePicker`、`thySelectControl`、`thy-cascader`。
- 自动将 `thySize="default"` 或 `thySize=""` 替换为 `thySize="lg"`，将 `[thySize]="'default'"` 或 `[thySize]="''"` 替换为 `[thySize]="'lg'"`。明确的 `xs`/`sm`/`md`/`lg` 和动态绑定保持不变。
- 自动将被删除的 Sass 变量替换为对应的 `lg` 变量：`$input-btn-height` → `$input-btn-height-lg`、`$input-padding-x` → `$input-padding-x-lg`、`$input-padding-y` → `$input-padding-y-lg`、`$btn-icon-circle-padding-base` → `$btn-icon-circle-padding-lg`、`$input-border-radius` → `$input-border-radius-lg`。支持带命名空间的写法（如 `variables.$input-padding-x`）和 `.scss`、`.sass` 两种语法。
- 自动将类型 `ButtonGroupSize` 重命名为 `ThyButtonSize`。
- 自动将类型 `InputSize`、`ThyInputSize`、`TimePickerSize`、`SelectControlSize` 重命名为 `ThyFormControlSize`。
- 自动将 `thy-action` 和 `thy-tag` 的输入参数 `thyTheme` 重命名为 `thyAppearance`。
- 自动将 `thy-header` 的输入参数 `thyHasBorder` 重命名为 `thyDivided`。
- 自动将 `thy-tag` 的 `thyAppearance="weak-fill"` 和 `thyTheme="weak-fill"` 替换为 `thyAppearance="subtle"`。
- 自动将 Button 旧复合 `thyButton` / `thyType`（如 `outline-primary`、`link-secondary`、`*-square`）改写为 `thyAppearance` + 颜色 type。

## 破坏性修改
- Button 类和 FormControl 类组件的默认尺寸从 36px 改为 md（32px）。受影响组件包括：`thy-button`、`thy-button-group`、`thy-button-icon`、`thyButton`、`thyButtonIcon`、`thy-input`、`thy-input-group`、`thy-input-search`、`thy-input-number`、`thyInput`、`thy-select`、`thy-custom-select`、`thy-native-select`、`thy-tree-select`、`thy-cascader`、`thy-select-control`、`thySelectControl`、`thy-date-picker`、`thy-range-picker`、`thy-month-picker`、`thy-quarter-picker`、`thy-week-picker`、`thy-year-picker`、`thy-time-picker`、`thyDatePicker`、`thyRangePicker`。如果需要保持 36px 的视觉效果，请添加 `thySize="lg"`。
- 上述受影响组件的 FormControl 类组件的尺寸类型统一为 `ThyFormControlSize`（`'xs' | 'sm' | 'md' | 'lg'`），旧的 `InputSize`、`ThyInputSize`、`TimePickerSize`、`SelectControlSize` 已删除。按钮尺寸类型 `ButtonGroupSize` 重命名为 `ThyButtonSize`。。
- `thy-action` 和 `thy-tag` 的 `thyTheme` 输入参数改名为 `thyAppearance`。
- `thy-header` 的 `thyHasBorder` 输入参数改名为 `thyDivided`。
- `thy-tag` 的 `weak-fill` 外观值改名为 `subtle`。
- 以下 Sass 变量已被删除，请使用对应的 `lg` 变量：`$input-btn-height`、`$input-padding-x`、`$input-padding-y`、`$btn-icon-circle-padding-base`、`$input-border-radius`。
- Button 新增 `thyAppearance`（`fill` / `outline` / `link`），`thyButton` / `thyType` 仅表示颜色（`default` / `primary` / `info` / `warning` / `danger` / `success`）。旧复合 type 对照：

| 旧 `thyButton` / `thyType` | 新写法 |
|---------------------------|--------|
| `outline-primary` | `thyAppearance="outline" thyButton="primary"` |
| `outline-default` | `thyAppearance="outline" thyButton="default"` |
| `link-secondary` | `thyAppearance="link" thyButton="default"` |
| `link` | `thyAppearance="link" thyButton="primary"` |
| `link-danger` 等 `link-*` | `thyAppearance="link" thyButton="{color}"` |
| `secondary` | `thyButton="primary"`（v22 默认 size 已是 `md`） |
| `primary-square` 等 `*-square` | 去掉 `-square`（与对应颜色视觉一致，如 `primary-square` → `primary`） |
| `link-danger-weak` | `class="link-danger-weak"`（非 Button API） |

弱危险链接（灰→红）不属于 Button，请继续使用 Link CSS：`class="link-danger-weak"`。`class="link-secondary"` 同样不改动。

> **说明：** `ThyButtonGroup` 的 `thyType="outline-default" | outline-primary"` 仍是独立 API，本变更不要求同步改造。

