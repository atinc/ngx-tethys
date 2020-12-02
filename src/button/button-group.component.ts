import { Component, HostBinding, Input, ContentChild, TemplateRef, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { ThyButtonType } from '.';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type buttonGroupSize = 'sm' | 'lg' | 'xs' | 'md';

export type buttonGroupType = 'outline-primary' | 'outline-default';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
    md: ['btn-group-md'],
    lg: ['btn-group-lg'],
    xs: ['btn-group-xs']
};

const buttonGroupTypeMap = {
    'outline-primary': ['btn-group-outline-primary'],
    'outline-default': ['btn-group-outline-default']
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
    set thySize(size: buttonGroupSize) {
        this.size = size;
        if (this.initialized) {
            this.setClasses();
        }
    }

    @Input()
    set thyType(type: ThyButtonType) {
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
        if (buttonGroupTypeMap[this.type]) {
            classNames = [...buttonGroupTypeMap[this.type]];
        }
        if (buttonGroupSizeMap[this.size]) {
            classNames.push(buttonGroupSizeMap[this.size]);
        }
        this.updateHostClassService.updateClass(classNames);
    }
}
