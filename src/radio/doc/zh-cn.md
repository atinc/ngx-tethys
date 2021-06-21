---
category: form
title: Radio
subtitle: 单选框
order: 1
---

## 何时使用
用于在多个选项中选中单个状态，由于选项默认可见，因此选项不宜过多。

## 模块导入
```ts
import { ThyRadioModule } from "ngx-tethys/radio";
```
## 如何使用
组件提供`thyRadio`和`thyRadioButton`两种指令，有radio和按钮两种样式展示方式，可单独使用，也可以配合`thy-radio-group`组合使用。

## 基础使用

```
<label thyRadio thyLabelText="单选选项"></label>

```
<example name="thy-radio-basic-example" />  

## 组合使用


```
<thy-radio-group [(ngModel)]="checkedValue">
  <label thyRadio thyLabelText="选项一" [thyValue]="1"></label>
  <label thyRadio thyLabelText="选项二" [thyValue]="2"></label>
  <label thyRadio thyLabelText="选项三" [thyValue]="3"></label>
</thy-radio-group>
```
使用`thyRadio`指令，展示效果如下:

<example name="thy-radio-group-example" />


```
<thy-radio-group [(ngModel)]="checkedValue" thySize="md">
  <label thyRadioButton thyLabelText="选项一" thyValue="1"></label>
  <label thyRadioButton thyLabelText="选项二" thyValue="2"></label>
  <label thyRadioButton thyLabelText="选项三" thyValue="3"></label>
</thy-radio-group>
```
使用`thyRadioButton`指令，效果如下。

<example name="thy-radio-group-button-example" />

