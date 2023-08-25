---
category: general
title: Styles
subtitle: 样式
---

<alert>工具类样式。</alert>

## 概述
除了基础组件外，TETHYS 提供了大量的样式工具类快速实现一些常用效果，比如字体大小、背景色、间距等，这些工具类参考 [Bootstrap V4](https://v4.bootcss.com/)，包括命名和部分代码实现。

## 字体大小

<example name="thy-styles-font-size-example" />

## 颜色

<example name="thy-styles-color-example" />

## 间距(Spacing)

TETHYS 除了提供了`Space`组件外，还提供了一些列关于`margin`和`padding`的工具样式类方便修改元素的外观。这些工具类遵循了从`xs`到`xl`的所有响应式断点（Responsive Breakpoints）。

样式类遵循以下命名格式:
- `{property}{sides}-{size}`（只对`xs`起作用）
- `{property}{sides}-{breakpoint}-{size}`（对`sm`, `md`, `lg`和`xl`起作用）

`property`值为:
- `m` - 设置`margin`
- `p` - 设置`padding`

`sides`值为:
- `t` - 设置`margin-top`或者`padding-top`
- `b` - 设置`margin-bottom`或者`padding-bottom`
- `l` - 设置`margin-left`或者`padding-left`
- `r` - 设置`margin-right`或者`padding-right`
- `x` - 同时设置`*-left`和`*-right`
- `y` - 同时设置`*-top`和`*-bottom`
- `blank` - 空，同时设置元素的`margin`或者`padding`四个边

`size`值为(`$spacer`默认为`1rem`也就是`16px`):
- `0` - 通过设置它为`0`消除`margin`或者`padding`（0px）
- `1` - (默认) 设置`margin`或者`padding`为`$spacer * .25`（4px）
- `2` - (默认) 设置`margin`或者`padding`为`$spacer * .5`（8px）
- `3` - (默认) 设置`margin`或者`padding`为`$spacer * 0.75`（12px）
- `4` - (默认) 设置`margin`或者`padding`为`$spacer * 1`（16px）
- `5` - (默认) 设置`margin`或者`padding`为`$spacer * 1.25`（20px）
- `6` - (默认) 设置`margin`或者`padding`为`$spacer * 1.5`（24px）
- `7` - (默认) 设置`margin`或者`padding`为`$spacer * 1.75`（28px）
- `8` - (默认) 设置`margin`或者`padding`为`$spacer * 2`（32px）
- `9` - (默认) 设置`margin`或者`padding`为`$spacer * 2.25`（36px）
- `10` - (默认) 设置`margin`或者`padding`为`$spacer * 2.5`（40px）
- `auto` - 设置`margin`为`auto`

在`CSS`中，`margin`属性可以有复数，但是`padding`属性不可以，针对`margin`设置负间距，设置负间距的语法和正间距类似，需要在大小前加一个`n`简写，比如`mt-1`的负间距为`mt-n1`:

```scss
.mt-n1 {
  margin-top: -0.25rem !important;
}
```

<alert>所有大小通过设置 Sass 变量`$spacers`，非特殊情况所有间距大小均遵循上述规范。</alert>

<example name="thy-styles-spacing-example" />

## 显示(Display)

如果`display`属性相关的工具类名称中间没有与断点(Responsive Breakpoints)相关的缩写（即 sm、md、lg、xl 等）的话，则能够影响所有断点，即`xs`到`xl`。这样设定是因为所有这种工具类都对 `min-width: 0;`及以上尺寸起作用，因此不受媒体查询的限制。

这些类遵循以下命名格式:
- `d-{value}`（只对`xs`起作用）
- `d-{breakpoint}-{value}`（对`sm`, `md`, `lg`和`xl`起作用）

`value`值如下:
- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

<alert>媒体查询所覆盖的屏幕宽度包括从给定的断点开始并延伸到更大的屏幕尺寸。例如，.d-lg-none 将在 lg 和 xl 屏幕尺寸下设置 display: none; 属性。</alert>

<example name="thy-styles-display-example" />

## Flex

设置元素为`display: flex;`通过如下工具类即可:
```html
<div class="d-flex p-2 bd-highlight">I'm a flexbox container!</div>

<div class="d-inline-flex p-2 bd-highlight">I'm an inline flexbox container!</div>
```

响应式的变种同样存在`.d-flex`和`.d-inline-flex`
- `.d-flex`
- `.d-inline-flex`
- `.d-sm-flex`
- `.d-sm-inline-flex`
- `.d-md-flex`
- `.d-md-inline-flex`
- `.d-lg-flex`
- `.d-lg-inline-flex`
- `.d-xl-flex`
- `.d-xl-inline-flex`

### Direction
通过`.flex-row`、`.flex-row-reverse`、`flex-column`和`.flex-column-reverse`设置方向:

```html
<div class="d-flex flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
  <div class="p-2 bd-highlight">Flex item 3</div>
</div>
<div class="d-flex flex-row-reverse bd-highlight">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
  <div class="p-2 bd-highlight">Flex item 3</div>
</div>

<div class="d-flex flex-column bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
  <div class="p-2 bd-highlight">Flex item 3</div>
</div>
<div class="d-flex flex-column-reverse bd-highlight">
  <div class="p-2 bd-highlight">Flex item 1</div>
  <div class="p-2 bd-highlight">Flex item 2</div>
  <div class="p-2 bd-highlight">Flex item 3</div>
</div>
```

### Justify content

```html
<div class="d-flex justify-content-start">...</div>
<div class="d-flex justify-content-end">...</div>
<div class="d-flex justify-content-center">...</div>
<div class="d-flex justify-content-between">...</div>
<div class="d-flex justify-content-around">...</div>
<div class="d-flex justify-content-evenly">...</div>
```

### Align items
```html
<div class="d-flex align-items-start">...</div>
<div class="d-flex align-items-end">...</div>
<div class="d-flex align-items-center">...</div>
<div class="d-flex align-items-baseline">...</div>
<div class="d-flex align-items-stretch">...</div>
```

### Align self

```html
<div class="align-self-start">Aligned flex item</div>
<div class="align-self-end">Aligned flex item</div>
<div class="align-self-center">Aligned flex item</div>
<div class="align-self-baseline">Aligned flex item</div>
<div class="align-self-stretch">Aligned flex item</div>
```

Fill

```html
<div class="d-flex bd-highlight">
  <div class="p-2 flex-fill bd-highlight">Flex item with a lot of content</div>
  <div class="p-2 flex-fill bd-highlight">Flex item</div>
  <div class="p-2 flex-fill bd-highlight">Flex item</div>
</div>
```

### Grow and shrink

```html
<div class="d-flex bd-highlight">
  <div class="p-2 flex-grow-1 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Third flex item</div>
</div>

<div class="d-flex bd-highlight">
  <div class="p-2 w-100 bd-highlight">Flex item</div>
  <div class="p-2 flex-shrink-1 bd-highlight">Flex item</div>
</div>
```

### Auto margins

```html
<div class="d-flex bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
</div>

<div class="d-flex bd-highlight mb-3">
  <div class="mr-auto p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
</div>

<div class="d-flex bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="ml-auto p-2 bd-highlight">Flex item</div>
</div>
```

With align-items

```html
<div class="d-flex align-items-start flex-column bd-highlight mb-3" style="height: 200px;">
  <div class="mb-auto p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
</div>

<div class="d-flex align-items-end flex-column bd-highlight mb-3" style="height: 200px;">
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="mt-auto p-2 bd-highlight">Flex item</div>
</div>
```

### Wrap
- `.flex-nowrap`
- `.flex-wrap`
- `.flex-wrap-reverse`

### Order
`order-0` - `order-12`
```html
<div class="d-flex flex-nowrap bd-highlight">
  <div class="order-3 p-2 bd-highlight">First flex item</div>
  <div class="order-2 p-2 bd-highlight">Second flex item</div>
  <div class="order-1 p-2 bd-highlight">Third flex item</div>
</div>
```

### Align content

- `align-content-start`
- `align-content-end`
- `align-content-center`
- `align-content-between`
- `align-content-around`
- `align-content-stretch`

## 可见性(Visibility)
与`display`不同，使用如下类不会改变元素的`display`属性，对布局不会产生影响，设置了`.invisible`的 HTML 元素仍然占据页面空间。页面内容在视觉上以及对使用辅助技术/屏幕阅读器的用户来说都是隐藏的。

```html
<div class="visible">...</div>
<div class="invisible">...</div>
```

## 边框(Borders)
<example name="thy-styles-borders-example" />

## 文本

<example name="thy-styles-text-example" />

## 文本图标

<example name="thy-styles-icon-text-example" />

## 可编辑文本

<example name="thy-styles-editable-example" />

## 垂直对齐

```html
<span class="align-baseline">baseline</span>
<span class="align-top">top</span>
<span class="align-middle">middle</span>
<span class="align-bottom">bottom</span>
<span class="align-text-top">text-top</span>
<span class="align-text-bottom">text-bottom</span>
```
<example name="thy-styles-vertical-align-example" />

## 变量(Variables)

颜色变量

```scss
$white: #fff;
$gray-70: #fdfdfd !default;
$gray-80: #fafafa !default; // 选项鼠标移上去的背景色，主要用于表格 Hover 移上去的颜色 和表格的编号背景色,
$gray-100: #f5f5f5 !default; // bordered 表格的背景色, 完成任务卡片颜色， Menu Item 移上去的背景色
$gray-200: #eee !default; // 模块左侧导航鼠标移上去的阴影, 次分割线，部分控件描边, 消息评论图标使用
$gray-210: #e9e9e9 !default; //整块区域的背景色为 #f3f3f3 后，某个卡片模块的背景色，用于文件详情
$gray-300: #ddd !default; // 主分割线, 进度条背景色，三级图标色
$gray-400: #cacaca !default; // 搜索框默认文字， 禁用图标颜色, 部分图标颜色,
$gray-500: #aaa !default; // 添加参与人,负责人等操作图标的边框颜色,说明文字, 搜索框文字
$gray-600: #999 !default; // 次要文字,如 Tab 切换文字
$gray-700: #666 !default; // 主要文字
$gray-800: #333 !default; // 标题和重点文字
$gray-900: #212529 !default;
$black: #000;

$body-color: $gray-800 !default;
$primary: #348fe4 !default;
$secondary: $gray-700 !default;
$success: #73d897 !default;
$info: #5dcfff !default;
$warning: #ffcd5d !default;
$danger: #ff7575 !default;
$pass: #2cccda !default;
$light: $gray-300 !default;
```
