---
category: feedback
title: Message
subtitle: 全局提示
order: 10
---

<alert>用于展示全局消息提示信息。</alert>

## 何时使用
- 可提供成功、警告、错误和加载中等反馈信息
- 不打断用户操作的轻量级提示方式。

## 模块导入
```ts
import { ThyMessageModule } from "ngx-tethys/message";
```

## 通知类型

- success：用于显示「成功」类的系统消息
- warning：用于显示「警告」类的系统消息
- error：用于显示「错误」类的系统消息
- info： 用于显示「消息」类的系统消息
- loading：用于显示「加载中」类的系统消息

## 设置全局默认值

对话框的默认选项可以通过在应用根模块中为`THY_MESSAGE_DEFAULT_CONFIG`令牌提供一个`ThyMessageConfig`实例来指定。

```ts
@NgModule({
    providers: [
        { 
            provide: THY_MESSAGE_DEFAULT_CONFIG,
            useValue: {
                type: 'success',
                pauseOnHover: true,
                duration: 4500,
                maxStack: 8,
                offset: 20
            }
        }
    ]
})
```

默认的配置如下：
```ts
const THY_MESSAGE_DEFAULT_CONFIG_VALUE = {
    type: 'success',
    pauseOnHover: true,
    duration: 4500,
    maxStack: 8,
    offset: 20
};
```

## 基本使用
```ts
messageService.show({ type: 'success', content: '成功 ' });
messageService.success('创建项目成功！');
```
<example name="thy-message-basic-example"></example>

<example name="thy-message-hover-example"></example>