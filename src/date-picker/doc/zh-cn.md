---
category: form
title: DatePicker
subtitle: 日期选择
---
<alert>选择日期的控件。</alert>

## 何时使用

当用户需要选择日期、日期区间以及日期时间，可以点击日期选择框以及指令组件弹出日期面板选择。
## 模块导入
```ts
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';

```
## 如何使用

日期提供组件`thy-date-picker`和指令`thyDatePicker`两种方式选择日期。

## 组件使用

组件有`thy-date-picker`、`thy-month-picker`、`thy-year-picker`和`thy-range-picker`四种类型，基本的使用如下：

```html
日期、月、年选择。

<thy-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)"></thy-date-picker>
<thy-month-picker [(ngModel)]="dateTime" (ngModelChange)="onChange($event)"></thy-month-picker>
<thy-year-picker [(ngModel)]="dateTime" (ngModelChange)="onChange($event)"></thy-year-picker>

日期范围选择。

<thy-range-picker [(ngModel)]="dateRange" (ngModelChange)="onChange($event)"></thy-range-picker>

日期选择功能，thyShowTime控制选择时间是否展示。

<thy-date-picker
  thyShowTime
  [thyFormat]="dateShowTime | thyDatePickerFormatString"
  thyPlaceHolder="选择时间"
  [(ngModel)]="dateTime"
  (ngModelChange)="onChange($event)"
></thy-date-picker>

```
展示效果：
<example name="thy-date-picker-basic-example" inline>

## 指令使用

```html
<thy-property-operation
  class="w-100 mb-3"
  thyLabelText="开始时间"
  [thyValue]="date | thyDatePickerFormat"
  thyIcon="calendar-check"
  thyDatePicker
  [(ngModel)]="date"
></thy-property-operation>
```
展示效果：

<example name="thy-date-picker-directive-example" inline>
