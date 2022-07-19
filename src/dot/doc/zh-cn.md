---
category: general
title: Dot
subtitle: 点
order: 31
---

<alert>展示一个点的组件。</alert>


## 模块导入
```ts
import { ThyDotModule } from "ngx-tethys/dot";
```

## 基本使用
```html
  <thy-dot></thy-dot>
  <span thyDot></span>
  <span thy-dot></span>
```

## 展示效果：
### 基本示例 

<example name="thy-dot-basic-example" />


### 颜色
- 系统主题色， `primary`  `success`  `info`  `warning` `danger`  `default`  `light`
- 自定义颜色，  例如：`#2cccda` `red`  `rgb(153, 153, 153)`

<example name="thy-dot-color-example" />

### 大小 
- 6px  `xs`  
- 8px  `sm`   
- 10px `md`   
- 12px `lg`  

<example name="thy-dot-size-example" />

### 形状 
- 圆形`circle`
- 方形`square`

<example name="thy-dot-shape-example" />

### 主题 
- 填充`fill`  
- 线框`outline`

<example name="thy-dot-theme-example" />


