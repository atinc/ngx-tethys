---
category: feedback
title: Fullscreen
subtitle: 全屏
order: 1
---


<alert>全屏显示组件。</alert>

## 模块导入

```ts
import { ThyFullscreenModule } from "ngx-tethys/fullscreen";
```



## 基本使用

全屏组件支持组件`thy-fullscreen`和指令`thyFullscreen`两种使用方式。
以指令方式为例：
- 在外层元素上加 `thyFullscreen`指令 并设置全屏模式 `thyMode`为`emulated`
- 在需要全屏的目标元素上添加 `fullscreen-target` 属性
- 在开启全屏的元素上添加 `fullscreen-launch` 属性触发和关闭全屏事件

```html
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

## 使用服务
全屏模块提供了`ThyFullscreen`全局服务，注入并调用`launch`方法即可打开全屏。

打开全屏之后，可以通过调用`launch`函数返回的`fullscreenRef`进行退出全屏和订阅相关事件，也可以通过`ThyFullscreen` 全局服务中的`exit`方法退出。

```ts
class MyComponent{
  constructor(private thyFullscreen: ThyFullscreen){}

  open(){
    const fullscreenRef = this.thyFullscreen.launch({
            target: '.fullscreen-target',
            mode: ThyFullscreenMode.emulated,
            emulatedContainer: 'body'
    });
  }

  exit(){
    this.thyFullscreen.exit();
  }
}
```

