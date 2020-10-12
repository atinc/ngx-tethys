---
category: form
title: Slider
subtitle: 滑动输入条
---

滑动输入条可以更直观地展示当前值和可选范围。

## 基础使用
我们可以通过直接调用此组件来展示数据：
```html
<thy-slider></thy-slider>
```
<example name="thy-slider-basic-example" />  

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
