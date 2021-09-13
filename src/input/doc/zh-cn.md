---
category: form
title: Input
subtitle: 输入框
order: 1
---

<alert>通过鼠标或键盘输入字符</alert>

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



## thy-input-search 搜索输入框

<example name="thy-input-search-example" />  


## 输入框前后置元素

- 使用标签`thy-input-group`，通过属性`thyPrependText`与`thyAppendText`添加

```html
<thy-input-group thyPrependText="前置" thyAppendText="$">
  <input thyInput placeholder="请输入元素" />
</thy-input-group>
```
- 使用自定义模板

```html
<thy-input [(ngModel)]="value" [thyAutofocus]="true">
  <ng-template #prepend>
    <div class="cursor-pointer">中国+86</div>
  </ng-template>
  <ng-template #append>
    <a href="javascript:;"><span thyLabel="default">获取验证码</span></a>
  </ng-template>
</thy-input>
```

<example name="thy-input-prepend-append-example" />  


## 密码输入框
支持输入的密码可见

<example name="thy-input-password-example" />

## 输入框label提示

<example name="thy-input-label-example" />
