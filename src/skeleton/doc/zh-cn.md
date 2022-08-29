---
category: feedback
title: Skeleton
subtitle: 骨架屏
order: 1
label: lack-doc
---
<div class="dg-alert dg-alert-info"> 在需要等待加载内容的位置提供一个占位图形组合。</div>

## 何时使用
* 网络较慢，需要长时间等待加载处理的情况下。
* 图文信息内容较多的列表/卡片中。
* 只在第一次加载数据的时候使用。

## 模块导入

``` ts
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
```

## 基本使用
### 矩形
<example name="thy-skeleton-rectangle-example" />

### 圆形
<example name="thy-skeleton-circle-example" />

### 自定义组合

<example name="thy-skeleton-custom-example" />
