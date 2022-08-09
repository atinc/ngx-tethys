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

<div class="dg-alert dg-alert-info"><strong>注1： 宿主节点必须设置相对定位！！</strong>  </div>
<div class="dg-alert dg-alert-info"><strong>注2： 宿主节点必须设置Id属性</strong>  </div>


## 模块导入

``` ts
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
```

## 基本使用

### 可调整水印样式
* degree: number  // 偏移角度
* textLineHeight: number // 行高
* distributeType: string //分布类型： more密集 less松散
* fontSize:number   // 字体大小
* color: string   // 字体颜色
* textAlign: string  // 对齐方式 left | center
``` ts
<div  thyWatermark="worktile\npingcode" [thyCanvasConfig]="thyCanvasStyles" id="basic2" style="position: relative"></div>
```

展示效果: 

<example name="thy-watermark-basic-example" />
