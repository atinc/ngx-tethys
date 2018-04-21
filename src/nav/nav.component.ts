import {
    Component,
    Directive,
    ElementRef,
    Renderer2,
    Input,
    HostBinding
} from '@angular/core';

export type ThyNavType = 'primary' | 'secondary' | 'thirdly';
export type ThyNavSize = '' | 'sm';
export type ThyNavHorizontal = '' | 'left' | 'center' | 'right';

const navTypeClassesMap: any = {
    primary: ['thy-nav', 'nav-primary'],
    secondary: ['thy-nav', 'nav-secondary'],
    thirdly: ['thy-nav', 'nav-thirdly']
};

const navVerticalClassesMap: any = {
    vertical: 'thy-nav-vertical',
};

const navSizeClassesMap: any = {
    sm: 'nav-sm'
};

const navHorizontalClassesMap: any = {
    left: '',
    center: 'justify-content-center',
    right: 'justify-content-end'
};

@Component({
    selector: 'thy-nav',
    template: `<ng-content></ng-content>`
})
export class ThyNavComponent {
    private _type: ThyNavType;
    private _size: ThyNavSize;
    private _horizontal: ThyNavHorizontal;
    private _vertical: boolean;

    @Input()
    set thyType(type: ThyNavType) {
        this._type = type;
        if (navTypeClassesMap[this._type]) {
            this.navClass += navTypeClassesMap[this._type].join(' ');
        }
    }

    @Input()
    set thySize(size: ThyNavSize) {
        this._size = size;
        if (navSizeClassesMap[this._size]) {
            this.navClass += ' ' + navSizeClassesMap[this._size];
        }
    }

    @Input()
    set thyHorizontal(horizontal: ThyNavHorizontal) {
        this._horizontal = horizontal;
        if (navHorizontalClassesMap[this._horizontal]) {
            this.navClass += ' ' + navHorizontalClassesMap[this._horizontal];
        }
    }

    @Input()
    set thyVertical(value: boolean) {
        this._vertical = value;
        if (value) {
            this.navClass += ' thy-nav--vertical';
        }
    }

    @HostBinding('class') navClass = '';
}

