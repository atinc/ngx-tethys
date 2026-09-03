---
category: display
title: Empty
subtitle: 空状态
description: 空状态时的展示占位组件。
---

<alert>空状态时的展示占位组件。</alert>

## 何时使用

没有提供数据时，用于显式的用户提示。

## 模块导入
```ts
import { ThyEmptyModule } from "ngx-tethys/empty";
```

<examples />

## 默认文案

未传入 `thyMessage` 时，组件会使用内置 locale 的默认文案，中文为「暂无数据」。如需自定义提示，直接传入 `thyMessage` 即可：

```html
<thy-empty thyMessage="没有任何数据"></thy-empty>
```

如需多语言，在调用方自行翻译后传入：

```html
<thy-empty [thyMessage]="'common.tips.NO_RESULT' | translate"></thy-empty>
```
