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

## 使用条件

<div class="dg-alert dg-alert-info"><strong>注： 宿主节点必须设置相对定位！！</strong>  </div>


## 模块导入

``` ts
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
```

## 基本使用

``` ts
<div style="position:relative;" thyWatermark="pingcode好啊真的好"> </div> 
```

展示效果: 

<example name="thy-watermark-basic-example" />
