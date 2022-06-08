---
category: display
title: Tag
subtitle: 标签
label: new
---

<alert>进行标记和分类的标签组件。</alert>

## 何时使用

- 用于标记事务的属性。
- 用于分类。


## 模块导入
```ts
import { ThyTagModule } from "ngx-tethys/tag";
```


## 标签种类
- 常规标签，用于标记与分类当前事务。
- 状态标签，用于展示某种操作或者活动状态，分为`state`、`pill`两种。


## 基本使用

```html
<thy-tag>Tag 1</thy-tag>
<label thyTag>Tag 2</label>
<thy-tag><a href="javascript:;">Link</a></thy-tag>
```

展示效果：

<example name="thy-tag-basic-example"/>

## 主题
标签有三种主题，分别为：
- `fill`: 背景色填充，文字颜色为白色或者灰色
- `outline`: 带边框颜色，文字颜色和边框同色
- `emboss`: 背景色为文字颜色的透明度 0.1

<example name="thy-tag-theme-example"/>

## 形状

<example name="thy-tag-shape-example" />

## 图标
<example name="thy-tag-icon-example" />

## 大小
- `sm`: 高度 20px
- `md`: 高度 24px（默认大小）
- `lg`: 高度 28px

<example name="thy-tag-size-example" />

## 自定义颜色
<example name="thy-tag-custom-example" />

