---
category: layout
title: Resizable
subtitle: 调整尺寸
label: experimental
---

<alert>调整元素尺寸组件。</alert>
## 何时使用
当需要拖拽边框调整元素宽高尺寸时使用。

- 支持栅格系统
- 支持布局系统
- 支持释放前预览提高性能
- 支持自定义调整手柄和预览样式

## 模块导入
```ts
import { ThyResizableModule } from 'ngx-tethys/resizable';
```

## 基本使用
```html
<div
  class="box"
  thyResizable
  [thyMaxWidth]="600"
  [thyMinWidth]="80"
  [thyMaxHeight]="200"
  [thyMinHeight]="80"
  [thyDisabled]="disabled"
  [style.height.px]="height"
  [style.width.px]="width"
  (thyResize)="onResize($event)"
>
  <thy-resize-handles></thy-resize-handles>
  content
</div>
```
<alert>注意： `[thyResizable]` 声明在需要调整尺寸的元素上，元素 `position` 属性必须为 `relative` | `absolute` | `fixed` |`sticky` 之一，默认会自动设置为 `relative`。</alert>

展示效果：
<example name="thy-resizable-basic-example" />
