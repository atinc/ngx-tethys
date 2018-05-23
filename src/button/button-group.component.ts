import {
    Component, HostBinding, Input,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';
import { ThyButtonType } from '.';

export type buttonGroupSize = 'sm' | 'lg' | '';

export type buttonGroupType = 'outline-primary' | '';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
    lg: ['btn-group-lg']
};

const buttonGroupTypeMap = {
    'outline-primary': ['btn-group-outline-primary'],
};

@Component({
    selector: 'thy-button-group',
    template: '<ng-content></ng-content>',
    providers: [
        UpdateHostClassService
    ],
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

    @HostBinding('class.btn-group') _isButtonGroup = true;

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
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
