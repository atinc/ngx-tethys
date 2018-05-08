export class ErrorMessageConfig {
    defaultRules = {
        required: '该选项不能为空',
        maxlength: '该选项输入值长度不能大于{maxlength}',
        minlength: '该选项输入值长度不能小于{minlength}',
        email: '输入邮件的格式不正确',
        repeat: '两次输入不一致',
        pattern: '该选项输入格式不正确',
        number: '必须输入数字',
        uniquecheck: '该输入值已经存在，请重新输入',
        url: '输入URL格式不正确',
        max: '该选项输入值不能大于{max}',
        min: '该选项输入值不能小于{min}',
        customizer: '自定义验证不通过'
    };
    [key: string]: {
        [key: string]: string
    }
}
