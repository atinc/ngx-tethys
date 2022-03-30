---
category: form
title: Input
subtitle: 输入框
---

<alert>通过鼠标或键盘输入字符。</alert>

## 何时使用

- 需要用户在表单中输入信息时。
- 提供组合型输入框，比如带搜索的输入框、可进行大小调整、可加前后置内容的。

## 模块导入
```ts
import { ThyInputModule } from "ngx-tethys/input";
```

## 基本使用

输入框支持组件和指令两种使用方式：
```html
<thy-input [disabled]="true" [(ngModel)]="value" placeholder="不可编辑"></thy-input>
<input thyInput [(ngModel)]="value" [thyAutofocus]="true" (thyEnter)="enter()" placeholder="请输入" />
```

<example name="thy-input-basic-example" />  

## 输入框大小
`default: 36px`、`xs: 24px`、`sm: 28px`、`md: 32px`、`lg: 44px`

<example name="thy-input-size-example" /> 

## 输入框前后置元素

通过 `thy-input-group` 组件，可以实现输入框前后追加元素，追加的元素是独立于输入框的，支持`thyPrependText`和`thyAppendText`，以及自定义模板。

```html
<thy-input-group thyPrependText="前置" thyAppendText="$">
  <input thyInput placeholder="请输入元素" />
</thy-input-group>
```

<example name="thy-input-group-example" />  

## 输入框内部前后置元素
`thy-input` 组件内部也支持 `prepend` 和 `append` 模板，不同于 Input Group，模板会嵌入到输入框内部。

<example name="thy-input-pre-suffix-example" />  

## 搜索输入框
Input 组件提供了`thy-input-search`组件实现搜索功能，同时也可以通过`thy-input-group`和`thy-input`的 append 模板组合搜索输入框，自带的搜索组件支持清除操作，组合实现的需要自行实现。

<example name="thy-input-search-example" />  


## 密码输入框
支持输入的密码可见

<example name="thy-input-password-example" />

## 输入框提示

<example name="thy-input-label-example" />
