import { coerceBooleanProperty } from 'ngx-tethys/util';
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

@Component({
    selector: 'thy-button-group',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ThyButtonGroupComponent implements OnInit {
    private initialized = false;

    private type: string;

    private size: string;

    private hostRenderer = useHostRenderer();

    @Input()
    set thySize(size: ButtonGroupSize) {
        this.size = size;
        if (this.initialized) {
            this.setClasses();
        }
    }

    @Input()
    set thyType(type: ButtonGroupType) {
        this.type = type;
        if (this.initialized) {
            this.setClasses();
        }
    }

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
        let classNames: string[] = [];
        if (this.type) {
            classNames.push(`btn-group-${this.type}`);
        }
        if (buttonGroupSizeMap[this.size]) {
            classNames.push(buttonGroupSizeMap[this.size]);
        }
        this.hostRenderer.updateClass(classNames);
    }
}
