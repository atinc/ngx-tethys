import {
    THY_VALIDATOR_CONFIG,
    ThyFormValidatorGlobalConfig
} from '../../../../src/form';

export const thyValidatorConfig: ThyFormValidatorGlobalConfig = {
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

export const thyValidatorConfigProvider = {
    provide: THY_VALIDATOR_CONFIG,
    useValue: thyValidatorConfig
};
