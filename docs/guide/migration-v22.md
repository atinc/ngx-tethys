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

## 破坏性修改
- 组件默认尺寸从 36px 改为 md（32px）。如果需要保持 36px 的视觉效果，请添加 `thySize="lg"`。
- 尺寸类型统一为 `ThyFormControlSize`（`'xs' | 'sm' | 'md' | 'lg'`），旧的 `InputSize`、`ThyInputSize`、`TimePickerSize`、`SelectControlSize` 已删除。按钮尺寸类型 `ButtonGroupSize` 重命名为 `ThyButtonSize`。
- `thy-action` 和 `thy-tag` 的 `thyTheme` 输入参数改名为 `thyAppearance`。
- `thy-header` 的 `thyHasBorder` 输入参数改名为 `thyDivided`。
- `thy-tag` 的 `weak-fill` 外观值改名为 `subtle`。
- 以下 Sass 变量已被删除，请使用对应的 `lg` 变量：`$input-btn-height`、`$input-padding-x`、`$input-padding-y`、`$btn-icon-circle-padding-base`、`$input-border-radius`。

