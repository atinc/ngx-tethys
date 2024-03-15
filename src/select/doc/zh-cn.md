---
category: form
title: Select
subtitle: 选择
---

<alert>下拉选择组件，包含基于原生的 `thy-native-select` 和完全自定义的 `thy-select` </alert>

## 何时使用
- 简单场景、UI风格可以接受浏览器默认select样式时使用 `thy-native-select`
- UI风格需要统一、交互更复杂的场景建议使用 `thy-select`

## 模块导入
```ts
import { ThySelectModule } from "ngx-tethys/select";
```

## 非 body 滚轴事件需要更新 CDK 的位置
在 select 相关的组件使用中，body 的滚轴事件会刷新 overlay 的位置。如果是自定义容器的滚轴事件则不会刷新，你可以在自定义容器上添加 `cdkScrollable` 指令以达到该目的。注意，这里需要导入相关的包 `import {ScrollingModule} from '@angular/cdk/scrolling';`，更多信息请参考 [scrolling/api](https://material.angular.io/cdk/scrolling/api)。

<examples />
