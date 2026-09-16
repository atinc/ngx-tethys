import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, effect, input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyButtonSize } from './button.component';
import { IThyButtonGroup, THY_BUTTON_GROUP } from './button.token';

/** @deprecated use ThyButtonGroupAppearance */
export type ButtonGroupType = 'outline-primary' | 'outline-default';

export type ThyButtonGroupAppearance = 'outline' | 'fill';

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
    providers: [
        {
            provide: THY_BUTTON_GROUP,
            useExisting: ThyButtonGroup
        }
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonGroup implements IThyButtonGroup {
    private hostRenderer = useHostRenderer();

    /**
     * 大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ThyButtonSize, ThyButtonSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    /**
     * 类型
     * @deprecated use thyAppearance
     * @type outline-default | outline-primary
     * @default outline-default
     */
    readonly thyType = input<ButtonGroupType>();

    /**
     * 按钮组外观
     * @type outline | fill
     * @default outline
     */
    readonly thyAppearance = input<ThyButtonGroupAppearance>('outline');

    /**
     * 是否需要最小宽度，默认按钮最小宽度
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
        const classNames: string[] = [];
        if (type) {
            classNames.push(`btn-group-${type}`);
        }
        if (this.thyAppearance() === 'fill') {
            classNames.push('btn-group-fill');
        }
        this.hostRenderer.updateClass(classNames);
    }
}
