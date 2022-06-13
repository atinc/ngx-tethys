import { InjectionToken } from '@angular/core';

export interface ThyConfirmAbstractComponent {
    okText: string;
    okType: string;
    cancelText: string;
    okLoadingText: string;
}

export const THY_CONFIRM_COMPONENT_TOKEN = new InjectionToken<ThyConfirmAbstractComponent>('thy-confirm-component-token');
