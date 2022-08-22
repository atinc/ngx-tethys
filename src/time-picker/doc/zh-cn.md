---
category: form
title: TimePicker
subtitle: 时间选择
label: new
---

## 何时使用

当用户需要选择时间时，可以点击时间选择框或手动输入时间进行选择。
## 模块导入
```ts
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';

```
## 如何使用

时间选择提供组件 `thy-date-picker` 选择时间。

## 组件使用

时间选择组件可以通过 `thyFormat` 属性设置时间类型，默认为 `HH:mm:ss`。

```html
<thy-time-picker [(ngModel)]="date" (ngModelChange)="onValueChange($event)"></thy-time-picker>
<thy-time-picker [(ngModel)]="date" thyFormat="HH:mm"></thy-time-picker>
```

展示效果：
<example name="thy-time-picker-basic-example" inline>