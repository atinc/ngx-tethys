import {
    Component, Directive, HostBinding,
    Input, ElementRef, Renderer2, ViewEncapsulation
} from '@angular/core';
import { AfterContentInit, OnChanges, OnInit } from '@angular/core';
import { inputValueToBoolean, isUndefined } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type IconShape = '' | 'dashed' | 'solid';

const sizeClassesMap: any = {
    'lg': ['btn-icon-lg'],
    'sm': ['btn-icon-sm'],
    'xs': ['btn-icon-xs']
};

const shapeClassesMap: any = {
    'circle-dashed': ['btn-icon-circle', 'circle-dashed'],
    'circle-solid': ['btn-icon-circle', 'circle-solid'],
    'circle-thick-dashed': ['btn-icon-circle', 'circle-dashed', 'border-thick'],
    'self-icon': ['btn-icon-self-circle']
};

const themeClassesMap: any = {
    'danger-weak': ['btn-icon-danger-weak']
};

@Component({
    selector: '[thy-button-icon],[thyButtonIcon]',
    templateUrl: './button-icon.component.html',
    providers: [
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonIconComponent implements OnInit {

    private _initialized = false;

    private _shape: IconShape;

    private _size: string;

    _iconPrefix = 'wtf';

    _iconClasses: string[];

    _icon: string;

    _theme: string;

    @HostBinding('class.btn') _isBtn = true;
    @HostBinding('class.btn-icon') _isBtnIcon = true;
    @HostBinding('class.btn-icon-light') _isLighted = false;

    _setIconClass(icon: string) {
        if (icon) {
            const classes = icon.split(' ');
            if (classes.length === 1) {
                classes.unshift('wtf');
            }
            this._iconClasses = classes;
        } else {
            this._iconClasses = null;
        }
    }

    @Input()
    set thySize(size: string) {
        this._size = size;
        if (this._initialized) {
            this._setClasses();
        }
    }

    // 字体前缀，默认 wtf
    @Input()
    set thyIcon(icon: string) {
        this._setIconClass(icon);
    }

    @Input()
    set thyButtonIcon(icon: string) {
        this._setIconClass(icon);
    }

    @Input()
    set thyShape(value: IconShape) {
        this._shape = value;
        if (this._initialized) {
            this._setClasses();
        }
    }

    @Input()
    set thyLight(value: boolean) {
        this._isLighted = inputValueToBoolean(value);
    }

    @Input()
    set thyTheme(value: string) {
        this._theme = value;
        if (this._initialized) {
            this._setClasses();
        }
    }

    private _setClasses() {
        const classes = sizeClassesMap[this._size] ? [...sizeClassesMap[this._size]] : [];
        if (this._shape && shapeClassesMap[this._shape]) {
            shapeClassesMap[this._shape].forEach((className: string) => {
                classes.push(className);
            });
        }
        if (this._theme && themeClassesMap[this._theme]) {
            themeClassesMap[this._theme].forEach((className: string) => {
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
