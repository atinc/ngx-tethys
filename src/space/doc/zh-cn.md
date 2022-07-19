---
category: layout
title: Space
subtitle: 间距
label: new
---

<alert>设置间距。</alert>

## 何时使用
当内部元素需要一段距离时使用，避免紧紧挨在一起。

## 模块导入
```ts
import { ThySpaceModule } from "ngx-tethys/space";
```

## 基本使用

```html
<thy-space>
  <button *thySpaceItem thyButton="primary">Button</button>
  <button *thySpaceItem thyButton="info">Button</button>
  <button *thySpaceItem thyButton="success">Button</button>
  <button *thySpaceItem thyButton="outline-default">Button</button>
  <button *thySpaceItem thyButton="outline-primary">Button</button>
  <a href="javascript:;" *thySpaceItem thyButton="link">Link</a>
</thy-space>
```
展示效果：
<example name="thy-space-basic-example" />

## 大小
Space 支持大小`'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg'`，同时支持自定义数字。分别为 0px, 4px, 8px, 12px, 16px, 20px, 24px, 28px。

展示效果：
<example name="thy-space-size-example" />
