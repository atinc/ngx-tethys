import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, effect, HostBinding, input, Input, OnInit, ViewEncapsulation } from '@angular/core';

export type ButtonGroupSize = 'sm' | 'lg' | 'xs' | 'md';

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
     * 类型
     * @type outline-default | outline-primary
     * @default outline-default
     */
    readonly thyType = input<ButtonGroupType>();

    /**
     * 是否需要最小宽度，默认按钮最小宽度为80px
     * @default false
     */
    readonly thyClearMinWidth = input(false, { transform: coerceBooleanProperty });

    constructor() {
        effect(() => {
            this.setClasses();
        });
    }

    private setClasses() {
        const type = this.thyType();
        const size = this.thySize();
        let classNames: string[] = [];
        if (type) {
            classNames.push(`btn-group-${type}`);
        }
        if (size && buttonGroupSizeMap[size]) {
            classNames = classNames.concat(...buttonGroupSizeMap[size]);
        }
        this.hostRenderer.updateClass(classNames);
    }
}
