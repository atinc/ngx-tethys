---
category: display
title: Carousel
subtitle: 走马灯
label: new
---

<alert>一组轮播的区域。</alert>

## 何时使用

最基础的走马灯组件,可自定义 indicators 模板


## 模块导入

```typescript
import { ThyCarouselModule } from 'ngx-tethys/carousel';
```

## 如何使用

- 自定义 control 样式,模板提供了 `carousel-control` 垂直居中样式与 `carousel-control-left/right` 样式,方便定位到左右两侧。

```html
<ng-template #controlPrev>
    <div class="thy-carousel-control thy-carousel-control-pre">
        <thy-icon thyIconName="arrow-left-bold"></thy-icon>
    </div>
</ng-template>
<ng-template #controlNext>
    <div class="thy-carousel-control thy-carousel-control-next">
        <thy-icon thyIconName="arrow-right-bold"></thy-icon>
    </div>
</ng-template>
```

- 自定义 indicator 样式,模板提供了 `active` 用于自行切换 选中样式 与 默认样式

```html
<ng-template #indicatorRender let-active>
    <span class="custom-indicator" [class]="active ? 'active' : ''"></span>
</ng-template>
```

<example name="thy-carousel-basic-example" />
