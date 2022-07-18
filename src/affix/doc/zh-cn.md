---
category: nav
title: Affix
subtitle: 固钉
---

<alert>将页面元素钉在可视范围。</alert>

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。


## 模块导入
```ts
import { ThyAffixModule } from 'ngx-tethys/affix';
```

## 基本使用
```html
<div class="demo-card">
  <thy-affix [thyOffsetTop]="80">
    <button thyButton [thyType]="'primary'">
      <span>Affix top</span>
    </button>
  </thy-affix>
  <br />
  <thy-affix [thyOffsetBottom]="100">
    <button thyButton [thyType]="'primary'">
      <span>Affix bottom</span>
    </button>
  </thy-affix>
</div>
```

展示效果：
<example name="thy-affix-basic-example" />
