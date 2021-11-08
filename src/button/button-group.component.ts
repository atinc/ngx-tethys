import { UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { Component, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
    providers: [UpdateHostClassService],
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonGroupComponent implements OnInit {
    private initialized = false;

    private type: string;

    private size: string;

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

    constructor(private updateHostClassService: UpdateHostClassService, private elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

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
        this.updateHostClassService.updateClass(classNames);
    }
}
