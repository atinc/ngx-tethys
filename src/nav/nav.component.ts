import {
    Component,
    Directive,
    ElementRef,
    Renderer2,
    Input,
    HostBinding,
    OnInit
} from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { inputValueToBoolean } from '../util/helpers';

export type ThyNavType = 'primary' | 'secondary' | 'thirdly';
export type ThyNavSize = '' | 'sm';
export type ThyNavHorizontal = '' | 'left' | 'center' | 'right';

const navTypeClassesMap: any = {
    primary: ['thy-nav', 'nav-primary'],
    secondary: ['thy-nav', 'nav-secondary'],
    thirdly: ['thy-nav', 'nav-thirdly'],
    'secondary-divider': ['thy-nav', 'nav-secondary-divider']
};

const navSizeClassesMap: any = {
    sm: 'nav-sm'
};

const navHorizontalClassesMap: any = {
    left: null,
    center: 'justify-content-center',
    right: 'justify-content-end'
};

@Component({
    selector: 'thy-nav',
    template: `<ng-content></ng-content>`,
    providers: [
        UpdateHostClassService
    ]
})
export class ThyNavComponent implements OnInit {
    private _type: ThyNavType;
    private _size: ThyNavSize;
    private _horizontal: ThyNavHorizontal;
    private _initialized = false;

    @Input()
    set thyType(type: ThyNavType) {
        this._type = type;
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @Input()
    set thySize(size: ThyNavSize) {
        this._size = size;
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @Input()
    set thyHorizontal(horizontal: ThyNavHorizontal) {
        this._horizontal = horizontal;
        if (this._initialized) {
            this._updateClasses();
        }
    }

    @Input()
    set thyVertical(value: boolean) {
        this._isVertical = value;
    }

    @Input()
    set thyFill(value: boolean) {
        this._isFill = value;
    }

    @HostBinding('class.thy-nav--vertical') _isVertical = false;

    @HostBinding('class.thy-nav--fill') _isFill = false;

    private _updateClasses() {
        let classNames = [];
        if (navTypeClassesMap[this._type]) {
            classNames = [...navTypeClassesMap[this._type]];
        }
        if (navTypeClassesMap[this._size]) {
            classNames.push(navSizeClassesMap[this._size]);
        }
        if (navHorizontalClassesMap[this._horizontal]) {
            classNames.push(navHorizontalClassesMap[this._horizontal]);
        }
        this.updateHostClass.updateClass(classNames);
    }

    constructor(private updateHostClass: UpdateHostClassService, private elementRef: ElementRef) {
        this.updateHostClass.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._initialized = true;
        this._updateClasses();
    }
}

