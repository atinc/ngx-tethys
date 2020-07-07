---
category: nav
title: Affix
subtitle: 固钉
---

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。


```ts
import { ThyAffixModule } from 'ngx-tethys/affix';
```

注意：thy-affix 内的元素不要使用绝对定位，如需要绝对定位的效果，可以直接设置 thy-affix 为绝对定位：

```ts
<thy-affix style="position: absolute; top: 10px, left: 10px">
  ...
</thy-affix>
```