---
category: feedback
title: Fullscreen
subtitle: 全屏
order: 1
label: lack-doc
---


<alert>全屏显示组件</alert>

## 何时使用
用于展示需要全屏展示的信息。

```ts
import { ThyFullscreenModule } from "ngx-tethys/fullscreen";
```


## 如何使用

全屏组件支持组件`thy-fullscreen`和指令`thyFullscreen`两种使用方式。


## 基本使用

```html
<thy-fullscreen thyMode="emulated" (thyFullscreenChange)="changeFullscreen($event)">
  <div fullscreen-target [style.backgroundColor]="'#fff'" class="p-2">
    <button thyButton="primary" fullscreen-launch>
      {{ btnContent }}
    </button>
    <div class="mt-2">普通全屏</div>
  </div>
</thy-fullscreen>

<div thyFullscreen thyMode="emulated" (thyFullscreenChange)="changeFullscreen($event)">
  <div fullscreen-target [style.backgroundColor]="'#fff'" class="p-2">
    <button thyButton="primary" fullscreen-launch>
      {{ btnContent }}
    </button>
    <div class="mt-2">普通全屏</div>
  </div>
</div>
```

展示效果：
<example name="thy-fullscreen-normal-example" />