import { THY_FORM_CONFIG } from '../../../../src/form';

export const thyFormConfig = {
    layout: 'vertical'
};

export const thyFormConfigProvider = {
    provide: THY_FORM_CONFIG,
    useValue: thyFormConfig
};
