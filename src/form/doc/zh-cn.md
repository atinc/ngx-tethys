---
category: form
title: Form
subtitle: 表单
---

<alert>表单验证和布局组件。</alert>

## 何时使用

表单具有数据收集、校验和提交功能，内部包含复选框、单选框、输入框、下拉选择框等元素。
> 使用该组件前请确保您已经阅读并掌握了 [Angular Forms](https://angular.io/guide/forms#forms) 的使用方式。

## 模块导入
```ts
import { ThyFormModule } from "ngx-tethys/form";
```
## 具备功能

- 统一表单布局，使用`thyForm`指令
- 统一表单控件，使用`thy-form-group`组件
- 基于 Angular 表单统一设置验证规则和错误反馈

## 基本使用

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
    <button [thyButton]="'default'" thyAppearance="link" (click)="cancel()">取消</button>
  </thy-form-group-footer>
</form>
```

## 动态表单
schema 驱动时使用`thy-dynamic-form`：按`thyFields`生成字段树，用`thy-form-group`渲染，不依赖`thyForm`指令。

- **布局**`thyLayout`：`horizontal`（默认）/ `vertical` / `inline`，未传回落`THY_FORM_CONFIG.layout`
- **占宽**`col`：12 列 Grid，默认 12；`inline` 下忽略
- **label 宽**`thyLabelWidth`：仅 Horizontal，默认`120px`，与`col`无关
- **radio 选项方向**：字段`props.layout`（如`flex`）交给`thy-radio-group`，与表单`thyLayout`无关
- **校验**：优先字段`errorMessages`，否则用`ThyFormValidatorLoader`；通过后`(thySubmit)`才发出值
- **其它**：内容投影操作区；`reset()`恢复`defaultValue`并清错；`(thyFieldValueChange)`里可改`thyFields`/`thyValue`；`key`/`kind`/校验器变化会重建字段树

### 自定义字段类型
字段渲染走统一注册表：库预置 `input` / `textarea` / `number` / `select` / `checkbox` / `radio` / `switch` / `time` / `date` / `dateRange`；业务通过 `provideThyDynamicFormFieldTypes` 注册自定义 kind。**同名 kind 后注册覆盖先注册**，优先级：库预置 < DI。

扩展约定：二次封装组件（不继承库字段组件）；schema 可用 `extends ThyFormFieldBaseSchema` 做类型扩展。
- 固定下发：`field`、`fieldSchema`、`size`、`invalid`（模板内绑 `[formField]`；`key` / `props` 从 `fieldSchema` 取）
- `props.multiple === true` 时默认值 `[]`，空数组不满足 `required`
- Signal Forms 要求 `[formField]` 写在字段组件模板上，故不能把裸控件直接当注册组件

```ts
import {
  provideThyDynamicFormFieldTypes,
  ThyFormFieldBaseSchema,
  ThyFormFieldSchemaWith
} from 'ngx-tethys/form';

interface MemberProps { label?: string; multiple?: boolean; options?: { value: string; label: string }[] }
interface MemberSchema extends ThyFormFieldBaseSchema<'member', MemberProps> {}
type AppFieldSchema = ThyFormFieldSchemaWith<MemberSchema>;

providers: [
  provideThyDynamicFormFieldTypes([{ kind: 'member', component: AppMemberField }])
]

const fields: AppFieldSchema[] = [
  { key: 'assignee', kind: 'member', props: { label: '负责人', multiple: true, required: true } }
];
```

未注册的 kind 显示 `Unsupported field kind.`。

<example name="thy-form-dynamic-example" />

## 多列展示
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
对于表单的布局，Footer的对齐方式，对应的组件都支持参数单独设置，如果需要全局替换默认的配置，可以通过注入令牌为`THY_FORM_CONFIG`的值进行配置，如下：
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

