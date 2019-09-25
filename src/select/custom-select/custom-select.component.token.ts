import { InjectionToken } from '@angular/core';
import { ThySelectOptionGroupComponent } from './option-group.component';

export interface IThySelectOptionParentComponent {
    thyMode: 'multiple' | '';
}

export interface IThySelectOptionGroupComponent {
    hidden: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_PARENT_COMPONENT = new InjectionToken<IThySelectOptionParentComponent>(
    'THY_SELECT_OPTION_PARENT_COMPONENT'
);

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_GROUP_COMPONENT = new InjectionToken<ThySelectOptionGroupComponent>(
    'THY_SELECT_OPTION_GROUP_COMPONENT'
);
