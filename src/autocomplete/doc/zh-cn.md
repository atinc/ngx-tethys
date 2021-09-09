---
category: form
title: AutoComplete
subtitle: 自动完成
order: 1
---
<div class="dg-alert dg-alert-info">输入框自动完成功能。</div>

## 何时使用
+ 需要一个输入框而不是选择器。
+ 需要输入建议/辅助提示。

和Select的区别在于：

+ AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。
+ Select 是在限定的可选项中进行选择，关键词是选择。


## 模块导入
```ts
import { ThyAutocompleteModule } from "ngx-tethys/autocomplete";
```

## 如何使用
组件提供`thyAutocompleteTrigger`指令，配合`thyAutocompleteComponent`可以自定义下拉列表内容，基本使用如下：
```html
<div>
  <input
    thyInput
    thyAutocompleteTrigger
    [(ngModel)]="value"
    [thyAutocompleteComponent]="auto"
    (ngModelChange)="valueChange($event)"
  />
  <thy-autocomplete #auto>
    <thy-option *ngFor="let item of listOfOption" [thyLabelText]="item.label" [thyValue]="item.value"></thy-option>
  </thy-autocomplete>
</div>
```

## 基础使用
<example name="thy-autocomplete-basic-example" />

## 高亮选中第一项
<example name="thy-autocomplete-active-example" />

## 自定义下拉列表样式
<example name="thy-autocomplete-custom-example" />


## 下拉列表全局配置

下拉列表的默认选项可以通过`THY_AUTOCOMPLETE_DEFAULT_CONFIG`令牌提供一个`ThyAutocompleteConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { provide: THY_AUTOCOMPLETE_DEFAULT_CONFIG, useValue: { placement: 'topRight' }}
  ]
})
```

默认的配置如下：
```ts
const DEFAULT_OPTIONS = {
    hasBackdrop: false,
    panelClass: '',
    closeOnNavigation: true,
    insideClosable: true,
    manualClosure: false,
    outsideClosable: true,
    originActiveClass: 'thy-autocomplete-origin-active'
};
```