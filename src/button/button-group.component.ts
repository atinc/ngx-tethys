import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, computed, effect, input, ViewEncapsulation } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import {
    parseLegacyButtonGroupStyle,
    resolveButtonGroupClass,
    ThyButtonColor,
    ThyButtonGroupAppearance
} from './util';

export type { ThyButtonColor, ThyButtonGroupAppearance } from './util';

export type ButtonGroupSize = 'sm' | 'lg' | 'xs' | 'md';

/**
 * @deprecated please use thyColor + thyAppearance instead of combined type strings
 */
export type ButtonGroupType = 'outline-primary' | 'outline-default';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
    md: ['btn-group-md'],
    lg: ['btn-group-lg'],
    xs: ['btn-group-xs']
};

/**
 * 按钮分组组件
 * @name thy-button-group
 * @order 30
 */
@Component({
    selector: 'thy-button-group',
    template: '<ng-content></ng-content>',
    host: {
        class: 'btn-group',
        '[class.btn-group-clear-min-width]': 'thyClearMinWidth()'
    },
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonGroup {
    private hostRenderer = useHostRenderer();

    /**
     * 大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ButtonGroupSize>();

    /**
     * 类型（旧组合字符串）。推荐使用 `thyColor` + `thyAppearance`
     * @type outline-default | outline-primary
     * @default outline-default
     * @deprecated please use thyColor and thyAppearance instead
     */
    readonly thyType = input<ButtonGroupType>();

    /**
     * 按钮组颜色
     * @type primary | default | info | warning | danger | success
     */
    readonly thyColor = input<ThyButtonColor | string>();

    /**
     * 按钮组外观。未传 `thyColor`/`thyType` 时不加类型 class；仅传 `thyColor` 时默认 outline
     * @type fill | outline
     * @default outline
     */
    readonly thyAppearance = input<ThyButtonGroupAppearance>();

    /**
     * 是否需要最小宽度，默认按钮最小宽度为80px
     * @default false
     */
    readonly thyClearMinWidth = input(false, { transform: coerceBooleanProperty });

    private readonly parsedLegacyStyle = computed(() => {
        const value = this.thyType();
        return value ? parseLegacyButtonGroupStyle(value) : null;
    });

    protected readonly color = computed(() => this.thyColor() || this.parsedLegacyStyle()?.color);

    protected readonly appearance = computed<ThyButtonGroupAppearance | undefined>(() => {
        const value = this.thyAppearance();
        if (value) {
            return value;
        }
        if (this.parsedLegacyStyle()) {
            return this.parsedLegacyStyle()!.appearance as ThyButtonGroupAppearance;
        }
        return this.thyColor() ? 'outline' : undefined;
    });

    constructor() {
        effect(() => {
            this.setClasses();
        });
    }

    private setClasses() {
        const classNames: string[] = [];
        const color = this.color();
        const appearance = this.appearance();
        if (color && appearance) {
            classNames.push(resolveButtonGroupClass(color, appearance));
        }
        const size = this.thySize();
        if (size && buttonGroupSizeMap[size]) {
            classNames.push(...buttonGroupSizeMap[size]);
        }
        this.hostRenderer.updateClass(classNames);
    }
}
