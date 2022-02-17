---
category: form
title: Slider
subtitle: 滑动输入条
---

<alert>滑动输入条，展示当前值和可选范围。</alert>

## 何时使用
当用户需要在数值区间/自定义区间内进行选择时使用。

## 模块导入
```ts
import { ThySliderModule } from "ngx-tethys/slider";
```

## 主题类型
- primary
- success
- info
- warning
- danger
- 自定义主题类型

## 滑动条大小
- sm：滑动条高度6px，默认
- md：滑动条高度10px
- lg：滑动条高度16px


## 基础使用
```html
<thy-slider></thy-slider>
```
## Basic
<example name="thy-slider-basic-example" />  

## Size
<example name="thy-slider-size-example" />  

## Type
<example name="thy-slider-type-example" />  

## Disabled
<example name="thy-slider-disabled-example" />  

## Vertical
<example name="thy-slider-vertical-example" />  

## 尝试自定义配置最大、最小以及 step 的值
示例中提供了可配置最大、最小以及 step 值的例子：
<example name="thy-slider-configurable-example" />  

## 与输入框配合使用  
也可以通过输入框输入我们想要的值：
```html
<thy-slider [(ngModel)]="value"></thy-slider>
<input [(ngModel)]="value" />
```
<example name="thy-slider-input-value-example" />  

## 修改值后的回调
如果我们想要在修改完值之后再执行一些自定义操作，那我们可以通过 `thyAfterChange` 来进行自定义操作：
```html
<thy-slider (thyAfterChange)="dragEnded($event)"></thy-slider>
```
<example name="thy-slider-drag-end-callback-example" />  
