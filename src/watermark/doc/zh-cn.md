---
category: other
title: Watermark
subtitle: 水印
order: 10
---
<div class="dg-alert dg-alert-info"> 用于水印生成、实时预览。</div>

## 何时使用

* 当页面需要添加水印时；
* 当页面需要水印生成预览时。

## 模块导入

``` ts
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
```

## 如何使用
父节点需设置 ```position: relative```，否则水印将相对于最近非 static 定位的祖先元素进行定位。

<examples />

## 自定义样式
```js
// 可调整水印样式
interface ThyCanvasConfigType {
    degree?: number; // 偏移角度
    color?: string; // 字体颜色
    fontSize?: number | string; // 字体大小 12 || 12px
    textLineHeight?: number; // 行高
    gutter?: number[];  // 横纵间距
}
```
