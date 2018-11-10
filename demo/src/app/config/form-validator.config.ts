import { THY_VALIDATOR_CONFIG, ThyFormValidatorConfig } from '../../../../src/form';

export const thyValidatorConfig: ThyFormValidatorConfig = {
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
