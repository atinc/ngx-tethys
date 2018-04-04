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

const navTypeClassesMap: any = {
    primary: ['thy-nav', 'nav-primary'],
    secondary: ['thy-nav', 'nav-secondary'],
    thirdly: ['thy-nav', 'nav-thirdly']
};

const navSizeClassesMap: any = {
    sm: ['nav-sm']
};

@Component({
    selector: 'thy-nav',
    template: `<ng-content></ng-content>`
})
export class ThyNavComponent {
    private _type: ThyNavType;
    private _size: ThyNavSize;

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
            this.navClass += ' ' + navSizeClassesMap[this._size].join(' ');
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
    set thyNavLink(active: ThyNavLink) {
        this._active = active;
        if (this._active) {
            this.navLinkClass = navLinkClassesMap['active'].join(' ');
        } else {
            this.navLinkClass = navLinkClassesMap['default'].join(' ');
        }
    }

    @HostBinding('class') navLinkClass = '';

    @HostBinding('attr.href') navLinkHref = 'javascript:;';
}

