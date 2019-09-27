import { InjectionToken } from '@angular/core';
import { ThySelectOptionGroupComponent } from './option-group.component';

export interface IThyCustomSelectComponent {
    isMultiple: boolean;
}

export interface IThySelectOptionGroupComponent {
    hidden: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_CUSTOM_SELECT_COMPONENT = new InjectionToken<IThyCustomSelectComponent>('THY_CUSTOM_SELECT_COMPONENT');

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_GROUP_COMPONENT = new InjectionToken<ThySelectOptionGroupComponent>(
    'THY_SELECT_OPTION_GROUP_COMPONENT'
);
