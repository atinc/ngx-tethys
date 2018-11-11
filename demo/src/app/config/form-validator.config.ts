import { THY_VALIDATOR_CONFIG, ThyFormValidatorGlobalConfig } from '../../../../src/form';

export const thyValidatorConfig: ThyFormValidatorGlobalConfig = {
    showElementError: true,
    removeElementError: true,
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
