---
title: 17.x 升级指南
path: 'migration-v17'
order: 990
hidden: false
---

<alert>本文档将帮助你从 ngx-tethys 和 @tethys/cdk 的 16.x 版本升级到 17.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js >= 18.10.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级，这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `17.x` 版本，并修改 package.json 中的依赖版本号。
- 自动把依赖的 CDK 和 Angular 库都升级到 `17.x` 版本，并修改 package.json 中的依赖版本号。
- 自动移除独立组件的 Component 后缀，比如：将 `ThyButtonComponent` 改成 `ThyButton`。
- 自动将「原生下拉选择组件」的类名由 `ThySelectComponent` 改成 `ThyNativeSelect`，相应的选择器由  `thy-select` 改成 `thy-native-select` 。
- 自动将「自定义下拉选择组件」的类名由 `ThySelectCustomComponent` 改成 `ThySelect`，相应的选择器由  `thy-custom-select` 改成 `thy-select` 。
- 自动将 `DialogHeaderComponent`、`DialogBodyComponent`、`DialogFooterComponent` 组件类重命名为 `ThyDialogHeader`、`ThyDialogBody`、`ThyDialogFooter`。
- 自动将 `thy-range-picker` 组件和 `thyRangePicker` 指令的输入参数由 `thyShortcutRanges` 改成`thyShortcutPresets`。
- 自动将 `thyDatePicker`、`thyRangePicker`、`thy-date-picker`、`thy-week-picker`、`thy-month-picker`、`thy-quarter-picker`、`thy-year-picker`、`thy-range-picker` 指令和组件的输出参数由 `thyShortcutValueChange` 改成 `thyDateChange`。
- 自动将接口 `ThyShortcutRange` 改成 `ThyShortcutPreset`。
- 自动将接口 `ThyShortcutValueChange` 改成 `ThyDateChangeEvent`。
- 自动将类型 `PanelMode` 改成 `ThyPanelMode`。
- 自动将类型 `RangeEntry` 改成 `ThyDateRangeEntry`。


## 破坏性修改
- `thy-range-picker` 组件和 `thyRangePicker` 指令的输入参数 `thyShortcutRanges` 改成了 `thyShortcutPresets`。
- `thyDatePicker`、`thyRangePicker`、`thy-date-picker`、`thy-week-picker`、`thy-month-picker`、`thy-quarter-picker`、`thy-range-picker`、`thy-year-picker` 指令和组件的输出参数 `thyShortcutValueChange` 改成了 `thyDateChange`。
- 接口 `ThyShortcutRange` 改成了 `ThyShortcutPreset`。
- 接口 `ThyShortcutValueChange` 改成了 `ThyDateChangeEvent`。
<br/>上述四个修改，涉及到数据结构的变化，如果有使用到的地方，请检查并根据错误提示手动修复。
