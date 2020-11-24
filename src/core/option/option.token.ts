import { InjectionToken } from '@angular/core';
import { ThySelectOptionGroupComponent } from './group/option-group.component';
import { ThyListLayout, ThyListOptionComponent } from './list-option/list-option.component';

export interface IThyOptionParentComponent {
    isMultiple: boolean;
}

export interface IThyOptionGroupComponent {
    hidden: boolean;
}

export interface IThyListOptionParentComponent {
    multiple?: boolean;
    layout?: ThyListLayout;
    // 选择，取消选择 option
    toggleOption(option: ThyListOptionComponent, event?: Event): void;
    // 设置当前选项为激活状态，即 hover 状态
    setActiveOption(option: ThyListOptionComponent, event?: Event): void;
    // 滚动到当前的选项
    scrollIntoView(option: ThyListOptionComponent): void;
    isSelected(option: ThyListOptionComponent): boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_PARENT_COMPONENT = new InjectionToken<IThyOptionParentComponent>('THY_OPTION_PARENT_COMPONENT');

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_GROUP_COMPONENT = new InjectionToken<ThySelectOptionGroupComponent>('THY_OPTION_GROUP_COMPONENT');

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_LIST_OPTION_PARENT_COMPONENT = new InjectionToken<IThyListOptionParentComponent>('THY_LIST_OPTION_PARENT_COMPONENT');
