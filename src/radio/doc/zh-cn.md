---
category: form
title: Radio
subtitle: 单选框
---

<alert>单选框。</alert>

## 何时使用
用于在多个选项中选中单个状态，由于选项默认可见，因此选项不宜过多。

## 模块导入
```ts
import { ThyRadioModule } from "ngx-tethys/radio";
```

## 如何使用

- 单独使用时，可用 `thyRadio` 或 `thyRadioButton` 两种样式。
- 从一组选项中单选时，使用 `thy-radio-group`：
  - 在组内放置 `thyRadio` / `thyRadioButton`；
  - 或通过 `thyOptions` 配置选项列表（`value` 组内应唯一）。二者同时传入时，以 `thyOptions` 为准。

## 代码示例

<examples />
