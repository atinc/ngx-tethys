---
category: general
title: Action
subtitle: 操作
---

<alert>另一个即时操作。</alert>

## 何时使用
当需要使用图标或者图标加文字进行操作且非按钮场景使用。

## 模块导入
```ts
import { ThyActionModule } from "ngx-tethys/action";
```

## 如何使用

支持组件和指令两种使用方式:
```html
<a href="javascript:;" thyAction thyActionIcon="vertical-view-lines"></a>
<a href="javascript:;" thyAction><thy-icon thyIconName="vertical-view-lines"></thy-icon></a>

<thy-action  thyActionIcon="vertical-view-lines"></thy-action>
<thy-action><thy-icon thyIconName="vertical-view-lines"></thy-icon></thy-action>
```

支持手动触发成功和失败反馈操作:
```html
<a #action1 thyAction thyIcon="copy" href="javascript:;" (click)="action1.success()"></a>
<a #action2 thyAction thyIcon="copy" href="javascript:;" (click)="action2.error({ duration: 2000 })"></a>
```


<examples />
