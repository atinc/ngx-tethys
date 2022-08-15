---
category: other
title: Watermark
subtitle: 水印
order: 10
label: Lack Doc
---
<div class="dg-alert dg-alert-info">【指令】类型。 用于水印生成、实时预览</div>

## 何时使用

对模块增加水印以及水印生成预览。 

## 模块导入

``` ts
import { ThyWatermarkModule, ThyCanvasConfigType } from 'ngx-tethys/watermark';
```

## 基本使用
<div class="dg-alert dg-alert-info">父节点需设置position: relative，否则水印将相对于最近非 static 定位的祖先元素进行定位。  </div>

```js
// 可调整水印样式
interface ThyCanvasConfigType {
    degree: number; // 偏移角度
    color: string; // 字体颜色
    fontSize: number | string; // 字体大小 12 || 12px
    textLineHeight: number; // 行高
    distributeType: string; //分布类型： more密集 less松散
}
```

``` ts
<div thyWatermark="worktile\npingcode" [thyCanvasConfig]="thyCanvasStyles" style="position: relative"></div>
```