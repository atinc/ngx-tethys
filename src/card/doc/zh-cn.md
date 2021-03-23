---
category: layout
title: Card
subtitle: 卡片
order: 30
---

通用的卡片组件。

## 何时使用

最基础的卡片组件，是一个内容容器，用于文本、照片和单个主题上下文的操作，同类星系聚合起来形成区块感。

## 使用示例
基本使用场景代码如下:
```html
<thy-card>
  <thy-card-header thyTitle="Card title" thyDescription="(Total: 10)">
    <ng-template #headerOperation>
      <a href="javascript:;" class="link-secondary">More</a>
    </ng-template>
  </thy-card-header>
  <thy-card-content>
    Card content
  </thy-card-content>
</thy-card>
```
展示效果：
<example name="thy-card-basic-example" inline>

