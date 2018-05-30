import {
    Component, Directive, HostBinding,
    Input, ElementRef, Renderer2, ViewEncapsulation
} from '@angular/core';
import { AfterContentInit, OnChanges, OnInit } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type IconType = '' | 'dashed' | 'solid';

const sizeClassesMap: any = {
    'lg': ['btn-icon-lg'],
    'sm': ['btn-icon-sm'],
    'xs': ['btn-icon-xs']
};

const typeClassesMap: any = {
    'circle-dashed': ['btn-icon-circle', 'circle-dashed'],
    'circle-solid': ['btn-icon-circle', 'circle-solid']
};

@Component({
    selector: '[thyButtonIcon]',
    templateUrl: './button-icon.component.html',
    providers: [
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonIconComponent implements OnInit {

    private _initialized = false;

    private _type: IconType;

    private _size: string;

    _iconPrefix = 'wtf';

    _icon: string;

    @HostBinding('class.btn') _isBtn = true;
    @HostBinding('class.btn-icon') _isBtnIcon = true;
    @HostBinding('class.btn-icon-light') _isLighted = false;

    @Input()
    set thySize(size: string) {
        this._size = size;
        if (this._initialized) {
            this._setClasses();
        }
    }

    // 字体前缀，默认 wtf
    @Input()
    set thyIconPrefix(value: string) {
        this._iconPrefix = value || 'wtf';
    }

    @Input()
    set thyButtonIcon(icon: string) {
        this._icon = icon;
    }

    @Input()
    set thyType(value: IconType) {
        this._type = value;
        if (this._initialized) {
            this._setClasses();
        }
    }

    @Input()
    set thyLight(value: boolean) {
        this._isLighted = inputValueToBoolean(value);
    }

    private _setClasses() {
        const classes = sizeClassesMap[this._size] ? [...sizeClassesMap[this._size]] : [];
        if (this._type && typeClassesMap[this._type]) {
            typeClassesMap[this._type].forEach((className: string) => {
                classes.push(className);
            });
        }
        this.updateHostClassService.updateClass(classes);
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClasses();
        this._initialized = true;
    }
}
