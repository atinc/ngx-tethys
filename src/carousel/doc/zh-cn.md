---
category: display
title: Carousel
subtitle: 走马灯
label: new
---

<alert>一组轮播的区域。</alert>

## 何时使用

最基础的走马灯组件,可自定义 dots 模板


## 模块导入

```typescript
import { ThyCarouselModule } from 'ngx-tethys/carousel';
```

## 如何使用

- 自定义 arrow 样式,模板提供了 `carousel-arrow` 垂直居中样式与 `carousel-arrow-left/right` 样式,方便定位到左右两侧,同时还提供了 `pre()` 与 `next()`,无需重复实现。

```html

<ng-template #arrowTemplate let-pre="pre" let-next="next">
    <div class="carousel-arrow carousel-arrow-left" (click)="pre()">
        <thy-icon thyIconName="arrow-left-circle"></thy-icon>
    </div>
    <div class="carousel-arrow carousel-arrow-right" (click)="next()">
        <thy-icon thyIconName="arrow-right-circle"></thy-icon>
    </div>
</ng-template>
```

- 自定义 dot 样式,模板提供了 `active` 用于自行切换 选中样式 与 默认样式

```html
<ng-template #dotTemplate let-active>
    <thy-icon thyIconName="aim" [class]="active ? 'active-color' : 'default-color'"></thy-icon>
</ng-template>
```

<example name="thy-carousel-basic-example" />
