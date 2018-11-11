## thyForm Validator

表单验证没有单独写一个 `thyFormValidator` 指令，而是直接在原有的 `thyForm` 指令上扩展

1. 使用 `ThyFormModule.forRoot(config: ThyFormValidatorGlobalConfig)` 导入模块，导入时可以传全局的配置文件，同时也可以使用注入 `THY_VALIDATOR_CONFIG` 达到同样的效果；
1. 初始化的配置除了可以使用上面的2种方式外还可以通过注入 `ThyFormValidatorLoader` 后调用相关设置方法；
1. 导入后 form 表单需要加上 `thyForm` 即可，提交按钮加上 `thyFormSubmit`，当点击提交按钮后会先验证，验证通过后调用 thyFormSubmit；
1. 验证支持 ng 自带的 `required`, `min`, `max`, `minlength`, `maxlength`, `pattern`, `email` 等等外, 还支持 `thyUniqueCheck` 一般用于远程唯一性检查使用.

### ThyFormValidatorGlobalConfig 配置

名称| 类型 | 备注 
---| --- | --- 
showError|  `boolean \| (element: HTMLElement, errorMessages: string[]) => void` | 显示错误方法，默认为 true，以 bootstrap 的方式提示错误
removeError|  `boolean \| (element: HTMLElement) => void` | 移除错误，一般和 showError 匹配使用
globalValidationMessages | `Dictionary<string>` | 全局默认显示错误信息的配置
validationMessages | `Dictionary<Dictionary<string>>` | 每个字段的验证提示信息配置

示例：

```
{
    showElementError: true,
    removeElementError: true,
    globalValidationMessages: {
        required: '该选项不能为空',
        maxlength: '该选项输入值长度不能大于{maxlength}',
        minlength: '该选项输入值长度不能小于{minlength}',
        thyUniqueCheck: '输入值已经存在，请重新输入',
        email: '输入邮件的格式不正确',
        repeat: '两次输入不一致',
        pattern: '该选项输入格式不正确',
        number: '必须输入数字',
        url: '输入URL格式不正确',
        max: '该选项输入值不能大于{max}',
        min: '该选项输入值不能小于{min}'
    },
    validationMessages: {
        username: {
            required: '用户名不能为空'
        }
    }
};
```

除了 `globalValidationMessages` 配置外，其他配置都可以通过在 thyForm 上传入 `ThyFormValidatorConfig` 参数单独为某个表单设置错误信息。
