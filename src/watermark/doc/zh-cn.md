---
category: general
title: watermark
subtitle: 水印
order: 1
---


<div class="dg-alert dg-alert-info">用于为当前容器添加水印。</div>

## 何时使用

1. 水印效果实时预览。
2. 为容器添加水印。

## 模块导入

``` ts
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
```

## 基本使用

``` ts
  <thy-watermark [thyContent]="'此处有水印 可实时预览'"></thy-watermark>
```

展示效果: 

<example name="thy-watermark-basic-example" />

## 禁止通过开发者工具移除水印

``` ts
  <thy-watermark [thyContent]="'此处有水印 禁止通过开发者工具移除'" [thyMust]="true"></thy-watermark>
```



展示效果: 

<example name="thy-watermark-must-example" />