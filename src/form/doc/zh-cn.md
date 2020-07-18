---
category: form
title: Form
subtitle: 表单
order: 1
---

表单具有数据收集、校验和提交功能，内部包含复选框、单选框、输入框、下拉选择框等元素。
> 使用该组件前请确保您已经阅读并掌握了[Angular Forms](https://angular.io/guide/forms#forms)的使用方式。

ThyForm 提供了如下功能：

- 统一表单布局，使用`thyForm`指令
- 统一表单控件，使用`thy-form-group`组件
- 基于Angular的验证统一设置验证规则和错误反馈

基本使用如下：
<example name="thy-form-basic-example" />

## 布局
`thyForm`提供了三种布局：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

<example name="thy-form-layout-example" />

## 表单验证
`thyForm`内部集成了错误反馈的功能，使用者只需要通过`thyFormValidatorConfig`参数配置验证错误提示的规则即可。
`thyForm`指令内部的提交按钮需要绑定`(thyFormSubmit)="submit()"`，绑定后点击提交按钮会根据 Angular Forms 表单验证状态实时显示错误反馈，验证通过后会执行`submit()`函数，否则会提示错误。

<example name="thy-form-validate-example" />

## 提交按钮
表单提交按钮一般会在表单最后一行展示，同时会根据表单的布局不同而调整，所以内置了`thy-form-group-footer`组件方便使用，`Footer`支持`thyAlign: left | center | right`参数配置对齐方式。

```html
<form thyForm name="demoForm" #demoForm="thyForm">
  ...
  <thy-form-group-footer>
    <button [thyButton]="'primary'" [thyLoading]="saving" thyLoadingText="登录中" (thyFormSubmit)="login(demoForm)">
      登录
    </button>
    <button [thyButton]="'link-secondary'" (click)="cancel()">取消</button>
  </thy-form-group-footer>
</form>
```

## 多行展示
表单要在同一行展示多个表单控件，需要和布局组件配合使用，使用`thyRow`、`thyCol`设置布局规则。
```html
<form
  thyForm
  thyLayout="vertical"
>
  <div thyRow [thyGutter]="30">
    <thy-form-group thyCol [thySpan]="24" thyLabelText="用户名" thyLabelRequired>
      ...
    </thy-form-group>

    <thy-form-group thyCol [thySpan]="12" thyLabelText="邮箱" thyLabelRequired>
      ...
    </thy-form-group>

    <thy-form-group thyCol [thySpan]="12" thyLabelText="数字" thyLabelRequired>
     ...
    </thy-form-group>
  </div>
</form>

```
## 全局配置
比如表单布局，footer对齐方式，每个组件都支持参数单独设置，如果需要全局替换默认的配置，可以通过注入`THY_FORM_CONFIG`配置，如下：
```ts
@NgModule({
    providers: [
        ...
        { 
            provide: THY_FORM_CONFIG,
            useValue: { layout: 'horizontal', footerAlign: 'left' }}
        ...
    ]
})
export class AppModule { }
```

全局的验证提示信息通过注入`THY_VALIDATOR_CONFIG`配置：
```ts
@NgModule({
    providers: [
        ...
        { 
            provide: THY_VALIDATOR_CONFIG,
            useValue: { globalValidationMessages: { username: { required: '用户名不能为空'} } }
        }
        ...
    ]
})
export class AppModule { }
```

