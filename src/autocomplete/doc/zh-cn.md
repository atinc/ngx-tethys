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
    [(ngModel)]="value"
    [thyAutofocus]="true"
    [placeholder]="placeholder"
    thyAutocompleteTrigger
    [thyAutocompleteWidth]="500"
    (ngModelChange)="valueChange($event)"
  />
  <thy-autocomplete #auto [thyEmptyText]="'没有搜索到任何数据'">
    <thy-option-group thyGroupLabel="最新浏览">
      <thy-option *ngFor="let item of listOfOption" [thyLabelText]="item.label" [thyValue]="item.value"></thy-option>
    </thy-option-group>
  </thy-autocomplete>
</div>
```

展示效果如下：
<example name="thy-autocomplete-basic-example" />
