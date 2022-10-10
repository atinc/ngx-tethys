---
category: feedback
title: Skeleton
subtitle: 骨架屏
label: experimental
---

<alert>在需要等待加载内容的位置提供一个占位图形组合。</alert>

## 何时使用
- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
## 模块导入
```ts
import { ThySkeletonModule } from "ngx-tethys/skeleton";
```

## 基本使用

<example name="thy-skeleton-list-example" />

## 自定义

- 通过自定义模版个性化设置自己的骨架图形。

<example name="thy-skeleton-custom-example" />