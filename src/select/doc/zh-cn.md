---
category: form
title: Select
subtitle: 选择
---

<alert>下拉选择组件，包含基于原生的 `thy-select` 和完全自定义的 `thy-custom-select` </alert>

## 何时使用
- 简单场景、UI风格可以接受浏览器默认select样式时使用 `thy-select`
- UI风格需要统一、交互更复杂的场景建议使用 `thy-custom-select`

## 模块导入
```
import { ThySelectModule } from "ngx-tethys/select";
```

## 如何使用
`thy-select` 基本使用如下：

```html
<thy-select [(ngModel)]="selectedOption" style="width: 200px">
  <option value="">请选择</option>
  <option value="option1">选项1</option>
  <option value="option2">选项2</option>
</thy-select>
```

展示效果如下：
<example name="thy-select-basic-example" /> 


`thy-custom-select` 基本使用如下：

```html
<div class="custom-basic-container">
  <thy-custom-select [(ngModel)]="selectedOption">
    <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label">
    </thy-option>
  </thy-custom-select>
  <thy-custom-select [(ngModel)]="selectedOption" [thyDisabled]="true">
    <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label">
    </thy-option>
  </thy-custom-select>
  <thy-custom-select [(ngModel)]="selectedOption" [thyShowSearch]="true">
    <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label">
    </thy-option>
  </thy-custom-select>
  <thy-custom-select [(ngModel)]="selectedOption" [thyAllowClear]="true">
    <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label">
    </thy-option>
  </thy-custom-select>
</div>
```


展示效果如下：
<example name="thy-select-custom-basic-example" />

