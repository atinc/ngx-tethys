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

<div class="dg-alert dg-alert-info">基础使用</div>
<example name="thy-radio-basic-example" />  

<div class="dg-alert dg-alert-info">组合使用</div>
<example name="thy-radio-group-example" />
<example name="thy-radio-group-button-example" />

