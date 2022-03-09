---
category: other
title: Guider
subtitle: 新手引导
---

<alert>新手引导组件可以有效、快速的帮助用户了解产品特色以及熟悉产品的使用，轻松上手去体验产品的功能，完成自己的目标。</alert>

## 何时使用

- 需要提示用户如何操作产品，或者降低用户的学习成本，帮助用户快速上手。
- 引导用户去使用产品的特色或者新上线的功能。

## 模块导入
```ts
import { ThyGuiderModule } from "ngx-tethys/guider";
```

## 基本使用
新手引导需要导入 `ThyGuider` 服务。使用服务中提供的 `ThyGuider.create` 方法传入相关的配置生成 `thyGuiderRef`，
以此来实现对新手引导前进、后退、关闭等操作。 

```typescript
this.guiderRef = this.thyGuider.create({
    steps: [
        {
            key: 'basic-hint-target',
            target: '.basic-hint-target',
            data: {
                image: '',
                title: '基础新手引导的使用',
                description: '设置相关的信息即可使用'
            }
        }
    ] as ThyGuiderStep[]
});

startTour() {
    this.guiderRef.start();
}
```

```html
<button class="basic-hint-target" thyButton="primary" (click)="startTour()">开始</button>
```
展示效果：
<example name="thy-guider-basic-tip-example" inline>

## 自定义显示的位置
新手引导可以自定义高亮区域以及提示面板的位置。
通过配置 `ThyGuiderStep` 中属性值来使新手引导提示面板出现在任何我们想要的位置：可以是相对某一元素，也可以是相对当前整个页面。
提示内容的位置是基于目标区域的 `ThyPlacement` 值，具体的配置可以参照
  <a href="http://lib.worktile.live/ngx-tethys/components/popover/examples" target="_blank">Popover Document</a>。

展示效果：
<example name="thy-guider-custom-position-example" inline>
