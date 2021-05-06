---
category: feedback
title: Alert
subtitle: 警告框
order: 1
---

<div class="dg-alert dg-alert-info">警告提示框。</div>

## 何时使用

- 用于展示返回的一些错误提示。
- 用于显示页面的一些提示说明。


## 模块导入
```
import { ThyAlertModule } from "ngx-tethys/alert";
```

## 如何使用

基本使用如下：
```
<thy-alert thyType="success" thyMessage="Well done! You successfully read this important alert message."></thy-alert>
```

展示效果如下：
<example name="thy-alert-basic-example" />


