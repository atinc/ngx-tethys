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

<examples />

## Stacked
Stacked 模式会展示多个进度条，thyValue 传入数组，数组中每一项为一个进度条，每个进度条可以配置进度值、颜色、显示文本和提示内容。`color` 表示进度条颜色，支持主题色 `primary | success | info | warning | danger` 或任意合法 CSS 颜色值。
```ts
export interface ThyProgressStackedValue {
    value: number;
    color?: ThyProgressColor | string;
    label?: string;
    tips?: string | TemplateRef<unknown>;
}
```
<example name="thy-progress-stacked-example" />  

