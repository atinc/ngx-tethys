---
category: form
title: Transfer
subtitle: 穿梭框
---

<alert>双栏穿梭选择框。</alert>

## 何时使用
- 当需要在多个可选项中进行多选时；
- 可以更直观的在两栏中移动，完成选择。

## 模块导入
```ts
import { ThyTransferModule } from "ngx-tethys/transfer";
```

## 基本使用
- 需要设置数据源thyData和标题集合thyTitles
- 右侧栏是否锁定、最大锁定数量、是否可以拖动。

```html
<thy-transfer
  [thyData]="transferData"
  [thyTitles]="['数据源', '已选中']"
  [thyRightDraggable]="true"
  [thyRightCanLock]="true"
  [thyRightLockMax]="maxLock"
  (thyDraggableUpdate)="onDragUpdate($event)"
  (thyChange)="onTransferChange($event)"
>
</thy-transfer>
```

<example name="thy-transfer-basic-example"></example>

## 自定义模版
<example name="thy-transfer-template-example"></example>

