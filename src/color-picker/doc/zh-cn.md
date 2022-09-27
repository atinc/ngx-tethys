---
category: form
title: ColorPicker
subtitle: 颜色选择器
order: 2
label: new
---


## 何时使用
当需要使用颜色选择的场景使用。

## 模块导入
```ts
import { ThyColorPickerModule } from "ngx-tethys/color-picker";
```

## 基本使用

支持指令使用方式:
```html
<span thyColorPicker [(ngModel)]="color" (ngModelChange)="change($event)">选颜色</span>

```
展示效果:

<example name="thy-color-picker-basic-example"/>