## 7.0.32

-   thy-breadcrumb 新增 thySeparator 属性，支持 slash | backslash 默认 arrow 箭头
-   util 新增操作数组的 immutable 类库 produce, 支持 `add`, `remove`, `update` 方法
    ```
    produce([users]).add(Entity);
    produce([users]).remove(id);
    produce([users]).update(id, {name: 'new name'});
    ```

## 7.0.31

-   修复 `thyFormGroup` 垂直排列图标显示错位的 Bug
-   修改 Store Action 函数没有副作用返回值是 Observable 的 Bug
-   修复 Store.select 返回类型的错误问题

## 7.0.30

thyStepper 增加参数 `thyShowStepHeader` 支持简单的步骤切换

## 7.0.29

thyStepper 增加参数 `thyShowStepHeader` 支持简单的步骤切换

## 7.0.28

add immutable util produce function support add, remove, update methods

## 7.0.27

修改 `thyAvatar` 默认大小配置错误问题

## 7.0.26

fix thyMenuItemAction can't bind click event to open popbox

## 7.0.25

修改 `thyEdit` xss 问题修复

## 7.0.24

修改 `thyTreeSelect` 宽度样式的问题

## 7.0.22

修改`$cdk-z-index-overlay` 设置为 1000
修改`input-search` 加载时边框闪烁样式问题

## 7.0.21

修改 `thyMenu` 文本溢出样式问题

## 7.0.20

-   添加滚动条样式;
-   change thyRadio's changeDetection to OnPush;
-   change thyRadioButton's changeDetection to OnPush;
-   change thyRadioGroup's changeDetection to OnPush;
-   change thy-loading's changeDetection to OnPush;

## 7.0.19

`thyEditor` 添加关联

## 7.0.17

`thyTree` ThyDialog OnPush 模式下 tree 异步加载界面不更新问题处理
`thyDialog` ThyDialog thy-dialog-container visible 样式修改的撤销

## 7.0.16

`store` 非单例注入报错处理

## 7.0.14

新增 `thy-sidebar[thyIsDraggableWidth]`， 设置 `thy-sidebar` 宽度可调节

## 7.0.13

`Store` 增加 `Redux_DevTools`
`ThyDialog` 修改容器 Wrapper 样式
修改 `Webpack` 打包相关配置

## 7.0.7

`thyDatepicker` 时间范围选择样式的修改

## 7.0.6

`thyGrid` 新增支持 `thyRowClassName`
`table` 样式支持排除某一行拖拽样式 `table-draggable-ignore-item`

## 7.0.5

`thy-date-range` 当双向绑定的值为空时，根据 `dateRanges` 设置日期区间；当双向绑定的值不为空时，不修改双向绑定的值。

## 7.0.4

修复发布错误。

## 7.0.2

`thyDatepicker` 新增支持设置最大值 `thyMaxDate`、最小值 `thyMaxDate`。

## 7.0.1

注销：ThyDraggableDirective，sky 使用报错

## 7.0.0

依赖库升级到 Angular 7.2.6， bootstrap 4.3.1。
主版本号，更改为随 Angular 主版本。

## 0.2.37

增加支持 ngx-bootstrap 3.2.0 版本

## 0.2.36

npm 发布错误，重新发布

## 0.2.35

新增菜单组件`thyMenu`
`ThyMaxDirective`, `ThyMaxDirective` 支持最大或最小值设置浮点数

## 0.2.34

`thyFileDrop` bug fixed

## 0.2.33

`thy-editor` 支持默认自动伸缩高度,
`thyFileDrop` 禁止上传文件夹、无后缀文件。修复拖拽区域中包含其他拖拽排序导致的交叉影响。

## 0.2.31

`form-validator` 错误信息支持占位符 `{min}` `{max}` `{minlength}` `{maxlength}`

## 0.2.30

bugfix： `thyFileDrop` 拖拽失效

## 0.2.29

修改 cdk `overlay`的`z-index`大于`modal`的`z-index`，避免在`modal`中弹出选择框，选择框被`modal`框遮盖

## 0.2.28

修改 `thy-breadcrumb` 组件样式，支持换肤

## 0.2.27

`thy-slide` 增加参数 `hasBackdrop` 支持幕布的显示隐藏
`thy-tree-select` 弹出样式的修改

## 0.2.26

`thy-tree-select` 组件增加 `[thyChildCountKey]` 支持根据该字段判断是否有子节点

## 0.2.25

增加 `thy-breadcrumb` 面包屑组件
`thy-tree-select` 组件基本功能完成

## 0.2.24

修改 `thy-tree` loading 加载位置错误的 bug
修改 `thyContextMenu` 指令使用 ngZone.runOutside 后 回调事件没调用 ngZone.run 的问题

## 0.2.23

`[thyFileSelect],thy-file-select` 组件增加 `thyAcceptFolder` 支持选择文件夹类型。Fixed `thyMultiple` false 失效 BUG。

## 0.2.22

`thy-grid` 组件增加 `(thyOnRowContextMenu)` 支持行右键操作，`thy-grid-column` 增加 `#header` 自定义模板支持 column header 自定义

## 0.2.21

`thy-tree` 组件部分重构，增加了 `ThyTreeNodeData` 用于规范传入数据格式，增加了 `ThyTreeNode` 类用于对 Node 进行各种操作，增加了 `[thyAsync]` `(thyOnExpandChange)` 用于异步加载。去除了灵活使用方式 Tree（因为可以通过原生 Angular 支持来实现）

## 0.2.20

解决引用组件库 `thy-tree-select` providers useFactory 导致的编辑错误问题

## 0.2.19

修改 editor 上传附件问题

## 0.2.18

临时通过 checkout 0.2.15 版本 解决引用组件库后编译报错问题

## 0.2.17

修改 date-range 左右切换逻辑 修复了当前选择的时期范围是本周（当前周只有两天），interval=7 时左右切换后的范围还是两天的 bug

## 0.2.16

扩展 `thy-property-operation`， 当`thyValue`有值时，可通过设置`thyLabelHasValue=true/false`控制`lable` 是否显示

## 0.2.15

修复 `thy-date-range` 传值不同步的问题

## 0.2.12

添加分页组件 `thy-pagination`
扩展 `thy-date-range` 支持点击隐藏菜单

## 0.2.11

thyeditor 上传图片支持是否多选，文件类型

## 0.2.10

0.2.9 版本发布错误，没有正确发布成功，没有编译新增的代码。

## 0.2.9

1. add EntityStore lite version to support crud operations [ed0e12b844582f5fd08134f18adf8899ce85b9a7](https://github.com/worktile/ngx-tethys/commit/ed0e12b844582f5fd08134f18adf8899ce85b9a7)
2. Store Action 支持直接调用，需要注意的是直接调用第一个参数不是 State，需要通过 this.snapshot 或者 this.getState() 获取 [b1da195096590be45031c2c3a9c45da64a0c8dde](https://github.com/worktile/ngx-tethys/commit/b1da195096590be45031c2c3a9c45da64a0c8dde)

## 0.2.8

扩展 `thy-editor` 支持传入 placeholder

## 0.2.7

修改 `thy-avatar` 背景样式
修复 `thy-input` thyAutofocus 命名错误问题

## 0.2.6

修复 `thy-loading` style

## 0.2.5

修复 `thy-input` focus 状态下没有显示边 bug

## 0.2.4

修改 `thy-input` lg 尺寸的 placeholder 字号改为 14px

## 0.2.3

修改 `thy-input` 支持 thyAutoFocus
扩展 `[min]` `[max]` 验证指令

## 0.2.2

移除 `thy-input-label` 扩展 `thy-input` 添加 `thyLabelText` 属性

## 0.2.1

修改 `thy-alert` scss 和 bootstrap 冲突 bug

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
修改 `thy-stepper` 样式，支持选中 step 下方的小箭头
修改单选按钮组 `thyRadioGroup` 支持验证

## 0.1.96

修改单选按钮组 `thyRadioButton` 支持 flex 布局

## 0.1.95

添加单选按钮组 `thyRadioButton`

## 0.1.94

添加步骤条组件 `thy-stepper`

## 0.1.93

扩展 `thy-label-input` 支持 thySize

## 0.1.92

添加 `thy-label-input` 组件

## 0.1.91

修改 `thy-input` 组件样式

## 0.1.90

修改 `thy-input` 组件样式

## 0.1.89

添加 `thy-input` 组件，支持 Input 输入框内自定义前置后置模板

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

1. 修复 `thy-selection-list` 的 Bug：当 ngModel 设置的默认值在 `thy-list-option` 中不存在的时候报错的问题，存储默认值，modelChange Emit 的时候返回。

## 0.1.79

1. `thy-selection-list` `thy-list-option` 样式调整以及换肤样式的添加；
1. `thy-custom-select` 样式的修改，使用统一的 thy-option 样式 mixin。

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
