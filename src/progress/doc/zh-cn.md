---
category: display
title: Progress
subtitle: 进度条
---


<alert>展示当前进度。</alert>

## 模块导入
```ts
import { ThyProgressModule } from "ngx-tethys/progress";
```

## Basic
<example name="thy-progress-basic-example" />  

## Stacked
Stacked 模式会展示多个进度条，thyValue 传入数组，数组中每一项为一个进度条，每个进度条可以配置进度值、类型、颜色、显示文本和提示内容。`color`和`type`表示进度条颜色，两者必须传入一个，如果都传以`color`为主。
```ts
export interface ThyProgressStackedValue {
    value: number;
    type?: ThyProgressType; // 'primary' | 'success' | 'info' | 'warning' | 'danger';
    color?: string;
    label?: string;
    tips?: string | TemplateRef<unknown>;
}
```
<example name="thy-progress-stacked-example" />  

## Size
<example name="thy-progress-size-example" />  
