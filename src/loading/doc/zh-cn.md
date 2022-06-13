---
category: feedback
title: Loading
subtitle: 加载中
---

<alert>用于页面和区块的数据加载中状态。</alert>


## 何时使用

  页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 模块导入

```ts
import { ThyLoadingModule } from 'ngx-tethys/loading';
```


## 基本使用

```html
<thy-loading [thyDone]="loadingDone"></thy-loading>
```

<example name="thy-loading-basic-example" />  
