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

    @HostBinding('class') navClass = '';
}


const navLinkClassesMap: any = {
    default: ['nav-link'],
    active: ['nav-link', 'active'],
};

export type ThyNavLink = '' | 'active';

@Directive({
    selector: '[thyNavLink]',
})
export class ThyNavLinkDirective {
    private _active: any;

    @Input()
    set thyNavLinkActive(active: ThyNavLink) {
        this._active = active;
        if (this._active) {
            this.navLinkClass += ' active';
        }
    }

    @HostBinding('class') navLinkClass = 'nav-link';

    @HostBinding('attr.href') navLinkHref = 'javascript:;';
}

