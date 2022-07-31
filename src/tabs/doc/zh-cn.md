---
category: nav
title: Tabs
subtitle: 选项卡
name: tabs
label: new
---

<alert>选项卡切换组件。</alert>

## 何时使用
- 用于展示平级的多个选项，当切换选项时，关联区域的内容会发生变化。
- 用于将大块内容进行分类收纳和展现。

## 模块导入
```ts
import { ThyTabsModule } from "ngx-tethys/tabs";
```

## 基本使用
```html
<thy-tabs (thyActiveTabChange)="activeTabChange($event)">
  <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
  <thy-tab thyTitle="Tab2">Tab2 Content</thy-tab>
  <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
</thy-tabs>
```

展示效果
<example name="thy-tabs-basic-example" />

## 大小
<example name="thy-tabs-size-example" />

## 自定义模板
<example name="thy-tabs-custom-example" />

## 附加操作
<example name="thy-tabs-extra-example" />

## 默认激活
<example name="thy-tabs-active-example" />

