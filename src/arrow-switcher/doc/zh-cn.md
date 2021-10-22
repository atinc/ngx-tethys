---
category: nav
title: Arrow Switcher
subtitle: 上下条切换
---

<alert>用于上下条目的切换。</alert>

## 何时使用

- 用于一组上下条目的切换

## 模块导入
```ts
import { ThyArrowSwitcherModule } from "ngx-tethys/arrow-switcher";
```

## 如何使用

基本使用如下：
```html
<thy-arrow-switcher
    [(ngModel)]="index"
    [thyTotal]="totalCount"
    (thyPrevious)="onPreviousClick($event)"
    (thyNext)="onNextClick($event)"
  ></thy-arrow-switcher>
```

展示效果如下：
<example name="thy-arrow-switcher-basic-example" />

