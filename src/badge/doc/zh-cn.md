---
category: display
title: Badge
subtitle: 徽标
---

<alert>图标右上角的圆形徽标数字。</alert>

## 何时使用
一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。


## 模块导入
```ts
import { ThyBadgeModule } from "ngx-tethys/badge";
```
## 基本使用
简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 thyKeepShow 修改为显示
<example name="thy-badge-basic-example"></example>

## 封顶数字
超过 thyMaxCount 的会显示为 ${thyCount}+，默认的 thyMaxCount 为 99。
<example name="thy-badge-overflow-example"></example>

## 类型展示
<example name="thy-badge-type-example"></example>

## 独立使用
不包裹任何元素即是独立使用，可自定样式展现。
在右上角的 badge 则限定为红色
<example name="thy-badge-independent-use-example"></example>

## 状态点
用于表示状态的小圆点。
<example name="thy-badge-state-point-example"></example>

## 指令使用
<example name="thy-badge-special-example"></example>
