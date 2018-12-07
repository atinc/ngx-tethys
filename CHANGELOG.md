## 0.2.8
扩展 `thy-editor` 支持传入placeholder

## 0.2.7
修改 `thy-avatar` 背景样式
修复  `thy-input` thyAutofocus 命名错误问题

## 0.2.6
修复 `thy-loading` style

## 0.2.5
修复 `thy-input` focus 状态下没有显示边bug

## 0.2.4 
修改 `thy-input` lg 尺寸的placeholder 字号改为 14px

## 0.2.3
修改 `thy-input` 支持 thyAutoFocus
扩展 `[min]` `[max]` 验证指令

## 0.2.2
移除 `thy-input-label` 扩展 `thy-input` 添加 `thyLabelText` 属性

## 0.2.1
修改 `thy-alert` scss 和 bootstrap 冲突bug

## 0.2.0
`thy-form` 支持添加 `form errors`
天机 `thy-from-group-error` 组件用于错误展示

## 0.1.99
添加警示框组件 `thy-alert`
修改 `thy-input` bug

## 0.1.98
`thy-stepper` 支持换肤
`thy-radio-group` 支持错误提示
`datepicker` 组件更新

## 0.1.97
修改 `thy-input` 组件，`thyType` 为 `password` 时，支持密码明文切换
修改 `thy-stepper` 样式，支持选中step下方的小箭头
修改单选按钮组 `thyRadioGroup` 支持验证

## 0.1.96
修改单选按钮组 `thyRadioButton` 支持flex布局

## 0.1.95
添加单选按钮组 `thyRadioButton`

## 0.1.94
添加步骤条组件 `thy-stepper`

## 0.1.93
扩展 `thy-label-input` 支持thySize

## 0.1.92
添加 `thy-label-input` 组件

## 0.1.91
修改 `thy-input` 组件样式

## 0.1.90
修改 `thy-input` 组件样式

## 0.1.89
添加 `thy-input` 组件，支持Input输入框内自定义前置后置模板

## 0.1.88
fix error for markdown

## 0.1.87
fix build error for styles folder lost.

## 0.1.86
fix build error for ThyFormModule

## 0.1.85
add thyFormValidator feature.

## 0.1.84
1. 修复换肤情况下 Input 输入框移入边框没有变色的 Bug；
1. 新增粉红色换肤；
1. 移除相关无用的引用。

## 0.1.81
1. select-custom add `thyDisabled` property.

## 0.1.80
1. 修复 `thy-selection-list` 的Bug：当 ngModel 设置的默认值在 `thy-list-option` 中不存在的时候报错的问题，存储默认值，modelChange Emit 的时候返回。

## 0.1.79
1. `thy-selection-list` `thy-list-option` 样式调整以及换肤样式的添加；
1. `thy-custom-select` 样式的修改，使用统一的  thy-option 样式 mixin。

## 0.1.78
`thy-selection-list` 添加 `thyUniqueKey` 属性用于 thyValue 是对象，但是存储选项的 Value 使用唯一 Key 的场景，主要用于选择的列表有不同对象引用，但是表示同一个对象的场景，比如与多个 Member 都是 {id:1,name:'张三'}，但是会来自不同的列表

## 0.1.77
change `thy-selection-list` component support delay load options, the default values can been selected.

## 0.1.76
1. `thy-grid` fix sortable bug ,restore `sortablejs` reference

## 0.1.75
1. replace `WorktileTech/sortablejs`

## 0.1.73
1. `thy-grid` fix column selections bug
1. `thy-tree` remove drag delay

## 0.1.71
`thy-key-selection` support ngModel set default selection values.

## 0.1.71
fix build typings file error, remove `thy-key-selection` component.

## 0.1.70
1. add ThyListModule module, contains `thy-list`,`thy-list-item`, `thy-selection-list`, `thy-list-option` components.
1. `thy-selection-list` support key up, down select option.

## 0.0.68
1. add property-operation component；
1. avatar component optimize and add ThyAvatarService to transform src, so `thySrc` can't input src full path.


## 0.0.45
1. change action menu default not stopPropagation;
1. add Input params `thyStopPropagation` for thyActionMenuToggle directive.

## 0.0.44
1. add ThyPositioningService for set setPosition;
1. change pop box use ThyPositioningService to pop.
## 0.0.22
fix store dispatch subscribe publishRelay
## 0.0.21
export RootStoreModule

## 0.0.20
fix store build error.

## 0.0.19
fix ts define file error.

## 0.0.18
1. add thy-empty component;
1. add thy store for state management.

## 0.0.13

Layout add `thy-content-section` and `thy-content-main` components 
