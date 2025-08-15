import { ElementRef, InjectionToken, InputSignal } from '@angular/core';
import { ThyListLayout } from '../shared.type';
import { ThyBooleanInput } from 'ngx-tethys/util';

export interface IThyOptionParentComponent {
    isMultiple: boolean;
}

export interface IThyOptionGroupComponent {
    hidden: boolean;
}

export interface IThyOptionComponent {
    thyValue: any;
    disabled?: boolean;
    element: ElementRef<HTMLElement>;
}

export interface IThyListOptionParentComponent {
    multiple?: InputSignal<ThyBooleanInput>;
    layout?: InputSignal<ThyListLayout>;
    // 选择，取消选择 option
    toggleOption(option: IThyOptionComponent, event?: Event): void;
    // 设置当前选项为激活状态，即 hover 状态
    setActiveOption(option: IThyOptionComponent, event?: Event): void;
    // 滚动到当前的选项
    scrollIntoView(option: IThyOptionComponent): void;
    isSelected(option: IThyOptionComponent): boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_OPTION_PARENT_COMPONENT = new InjectionToken<IThyOptionParentComponent>('THY_OPTION_PARENT_COMPONENT');

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_LIST_OPTION_PARENT_COMPONENT = new InjectionToken<IThyListOptionParentComponent>('THY_LIST_OPTION_PARENT_COMPONENT');
