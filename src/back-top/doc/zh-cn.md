---
category: other
title: BackTop
subtitle: 回到顶部
order: 10
---

<alert>返回页面顶部的操作按钮。</alert>

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## 模块导入

```ts
import { ThyBackTopModule } from "ngx-tethys/back-top";
```

## 基本使用
```html
<thy-back-top thyContainer="dg-channel"></thy-back-top>

<!-- 自定义内容 -->
<thy-back-top [thyTemplate]="tpl" thyContainer="dg-channel" (click)="notify()">
  <ng-template #tpl>
    <div class="back-top-inner">UP</div>
  </ng-template>
</thy-back-top>

<!-- 对指定 DOM 元素返回顶部 -->
<div #divTarget>
  ...
  <thy-back-top (visibleChange)="visibleChange($event)" (thyClick)="click($event)" [thyContainer]="divTarget"></thy-back-top>
</div>
```

<example name="thy-back-top-basic-example" />

## 自定义内容
使用 `thyTemplate` 自定义 thy-back-top 内容
<example name="thy-back-top-custom-example" />

## 对指定元素返回顶部
使用 `thyContainer` 指定返回哪个元素顶部
<example name="thy-back-top-target-example" />