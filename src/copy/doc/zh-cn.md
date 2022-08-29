---
category: other
title: Copy
subtitle: 复制
order: 60
---

<alert>用于复制页面中的内容</alert>

## 何时使用

- 当需要实现内容拷贝时
  
## 模块导入
```ts
import { ThyCopyModule } from "ngx-tethys/copy";
```

## 基本使用
通过给标签增加thyCopy指令，点击触发，实现复制标签中的文本：

展示效果：
<example name="thy-copy-basic-example"/>



## 自定义内容
通过`thyCopyContent`传入要复制的内容：

展示效果：
<example name="thy-copy-copy-content-example"/>


## 是否展示通知
展示效果：
<example name="thy-copy-notify-example"/>
