import { THY_FORM_CONFIG, ThyFormConfig } from '../../../../src/form';

export const thyFormConfig: ThyFormConfig = {
    layout: 'vertical',
    footerAlign: 'left'
};

export const thyFormConfigProvider = {
    provide: THY_FORM_CONFIG,
    useValue: thyFormConfig
};
