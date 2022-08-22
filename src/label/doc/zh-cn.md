---
category: display
title: Label
subtitle: 标签
label: deprecated
---

<alert type="warning">此组件已经废弃，请使用 Tag 组件代替。</alert>

<alert>进行标记和分类的标签组件。</alert>

## 何时使用

- 用于标记事务的属性。
- 用于分类。


## 模块导入
```ts
import { ThyLabelModule } from "ngx-tethys/label";
```


## 标签种类
- 常规标签，用于标记与分类当前事务。
- 状态标签，用于展示某种操作或者活动状态，分为`state`、`pill`两种。



## 基本使用

```html
<span class="mr-1" thyLabel="default">Default</span>
<span class="mr-1" thyLabel="primary">Primary</span>
<span class="mr-1" thyLabel="success">Success</span>
<span class="mr-1" thyLabel="info">Info</span>
<span class="mr-1" thyLabel="warning">Warning</span>
```

展示效果：

<example name="thy-label-basic-example" inline/>


## 大小
  固定的大小有 `sm:20px`、`default:22px`、`md:24px`、`lg:26px`， 默认为 `default`
  <example name="thy-label-size-example" inline/>


## 状态类标签
  类型有`state`、`pill`两种，默认不设置
  <example name="thy-label-type-example" inline/>
   
