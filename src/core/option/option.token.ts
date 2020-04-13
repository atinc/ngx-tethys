import { InjectionToken } from '@angular/core';
import { ThySelectOptionGroupComponent } from './group/option-group.component';

export interface IThyOptionParentComponent {
    isMultiple: boolean;
}

export interface IThyOptionGroupComponent {
    hidden: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_PARENT_COMPONENT = new InjectionToken<IThyOptionParentComponent>('THY_OPTION_PARENT_COMPONENT');

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_GROUP_COMPONENT = new InjectionToken<ThySelectOptionGroupComponent>(
    'THY_OPTION_GROUP_COMPONENT'
);
