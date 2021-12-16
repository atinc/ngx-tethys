---
category: feedback
title: Alert
subtitle: 警告框
---

<alert>警告提示框。</alert>

## 何时使用

- 用于展示需要向用户显示警告的信息。
- 用于非浮层的静态展示，用户可选择始终展示或手动关闭。


## 模块导入
```ts
import { ThyAlertModule } from "ngx-tethys/alert";
```

## 如何使用

基本使用如下：
```html
<thy-alert thyType="success" thyMessage="Well done! You successfully read this important alert message."></thy-alert>
```

展示效果如下：
<example name="thy-alert-basic-example" />


## thyAlertActionItem 指令

样式指令，用于给警告框添加自定义操作按钮样式。

<example name="thy-alert-operation-example" />



