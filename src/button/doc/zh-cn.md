---
category: general
title: Button
subtitle: 按钮
order: 10
---

<alert>按钮用于开始一个即时操作。</alert>

## 何时使用
标记了一个（或一组）操作命令，响应用户点击行为，触发相应的事件。

## 模块导入
```ts
import { ThyButtonModule } from "ngx-tethys/button";
```

## 按钮种类
在 Worktile Design 中，有四种按钮:

- 主按钮：用于重要操作，一个操作区域只能有一个主按钮，常用于添加，保存
- 线框按钮：用于视图，审批状态
- 按钮链接：用于次要或外链的操作，比如 `取消`
- 按钮图标：用于工具栏操作

## 按钮状态

- 主要按钮：主色
- 信息按钮：用于展示信息
- 危险按钮：删除/归档等危险操作，一般需要二次确认
- 禁用：操作不可用的时候

## 基本使用
按钮组件支持组件和指令两种使用方式
```html
<button thyButton="primary">Primary</button>
<thy-button thyType="primary">Primary</thy-button>
```
<example name="thy-button-basic-example"></example>

## 按钮大小
- `default: 36px`， 一般用于表单中的保存和确定。
- `md: 32px`，一般用于页面右上角的新建和编辑
- `sm: 28px`，一般用于即时编辑页面的确定按钮，比如详情页的描述编辑或者看板下的新建确定
- `xs: 24px`，一般用于按钮图标，比如子工作项的截止时间和负责人设置等操作图标按钮
- `lg: 44px`，一般用于类似登录注册页面的确定按钮，通常整行展示

<example name="thy-button-size-example"></example>

## 按钮对
<example name="thy-button-pair-example"></example>

## 线框按钮
<example name="thy-button-outline-example"></example>

## 按钮链接
<example name="thy-button-link-example"></example>

## 按钮图标
<example name="thy-button-icon-example"></example>

## 按钮组
<example name="thy-button-group-example"></example>
