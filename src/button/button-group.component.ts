import {
    Component,
    HostBinding,
    Input,
    ContentChild,
    TemplateRef,
    ElementRef,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';
import { ThyButtonType } from '.';
import { inputValueToBoolean } from '../util/helpers';

export type buttonGroupSize = 'sm' | 'lg' | 'xs' | 'md';

export type buttonGroupType = 'outline-primary' | 'outline-default';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
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
    private _type: string;

    private _size: string;

    @Input()
    set thySize(size: buttonGroupSize) {
        this._size = size;
    }

    @Input()
    set thyType(type: ThyButtonType) {
        this._type = type;
    }

    @Input()
    set thyClearMinWidth(value: string) {
        this.thyClearMinWidthClassName = inputValueToBoolean(value);
    }

    @HostBinding('class.btn-group') _isButtonGroup = true;
    @HostBinding(`class.btn-group-clear-min-width`)
    thyClearMinWidthClassName = false;

    constructor(private updateHostClassService: UpdateHostClassService, private elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClasses();
    }

    private _setClasses() {
        let classNames: string[] = [];
        if (buttonGroupTypeMap[this._type]) {
            classNames = [...buttonGroupTypeMap[this._type]];
        }
        if (buttonGroupSizeMap[this._size]) {
            classNames.push(buttonGroupSizeMap[this._size]);
        }
        this.updateHostClassService.updateClass(classNames);
    }
}
