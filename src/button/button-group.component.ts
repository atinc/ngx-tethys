import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
    template: '',
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonGroup implements OnInit {
    private initialized = false;

    private type: string;

    private size: string;

    private hostRenderer = useHostRenderer();

    /**
     * 大小
     * @type xs | sm | md | lg
     * @default md
     */
    @Input()
    set thySize(size: ButtonGroupSize) {
        this.size = size;
        if (this.initialized) {
            this.setClasses();
        }
    }

    /**
     * 类型
     * @type outline-default | outline-primary
     * @default outline-default
     */
    @Input()
    set thyType(type: ButtonGroupType) {
        this.type = type;
        if (this.initialized) {
            this.setClasses();
        }
    }

    /**
     * 是否需要最小宽度，默认按钮最小宽度为80px
     * @default false
     */
    @Input()
    set thyClearMinWidth(value: string) {
        this.thyClearMinWidthClassName = coerceBooleanProperty(value);
    }

    @HostBinding('class.btn-group') _isButtonGroup = true;
    @HostBinding(`class.btn-group-clear-min-width`)
    thyClearMinWidthClassName = false;

    constructor() {}

    ngOnInit() {
        this.setClasses();
        this.initialized = true;
    }

    private setClasses() {
        const classNames: string[] = [];
        if (this.type) {
            classNames.push(`btn-group-${this.type}`);
        }
        if (this.size && this.size in buttonGroupSizeMap) {
            classNames.push(...(buttonGroupSizeMap[this.size as keyof typeof buttonGroupSizeMap] as string[]));
        }
        this.hostRenderer.updateClass(classNames);
    }
}
