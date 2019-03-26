
import { Directive, HostBinding, Input, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

export type ThyActionMenuTheme = 'default' | 'group';

@Component({
    selector: 'thy-action-menu',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ThyActionMenuComponent {

    @HostBinding('class.action-menu') className = true;

    @HostBinding('class.action-menu--group') themeClassName = false;

    @HostBinding('style.width') styleWidth = '';

    @Input()
    set thyTheme(value: ThyActionMenuTheme) {
        this.themeClassName = value === 'group';
    }

    @Input() set thyWidth(value: string) {
        this.styleWidth = value;
    }


    constructor() { }
}

@Directive({
    selector: '[thyActionMenuItem]',
})
export class ThyActionMenuItemDirective {

    @HostBinding('class.action-menu-item') className = true;

    @HostBinding('class.action-menu-item--disabled') disabled = false;

    @Input()
    set thyDisabled(value: boolean) {
        this.disabled = inputValueToBoolean(value);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuItemIcon]',
})
export class ThyActionMenuItemIconDirective {

    @HostBinding('class.icon') className = true;

    constructor() { }

}

@Directive({
    selector: '[thyActionMenuItemName]',
})
export class ThyActionMenuItemNameDirective {

    @HostBinding('class.name') className = true;

    constructor() { }

}

@Directive({
    selector: '[thyActionMenuItemMeta]',
})
export class ThyActionMenuItemMetaDirective {

    @HostBinding('class.meta') className = true;

    constructor() { }

}

@Directive({
    selector: '[thyActionMenuItemInfo]',
})
export class ThyActionMenuItemInfoDirective {

    @HostBinding('class.info') className = true;

    constructor() { }

}

@Directive({
    selector: '[thyActionMenuItemExtendIcon]',
})
export class ThyActionMenuItemExtendIconDirective {

    @HostBinding('class.extend-icon') className = true;

    constructor() { }

}

@Directive({
    selector: '[thyActionMenuSubItem]',
})
export class ThyActionMenuSubItemDirective {

    @HostBinding('class.action-menu-sub-item') className = true;

    constructor() { }
}

@Component({
    selector: 'thy-action-menu-divider',
    template: `<div class="action-menu-divider-title">{{title}}</div>`
})
export class ThyActionMenuDividerComponent {

    title: string;

    @HostBinding('class.action-menu-divider') className = true;

    @Input()
    set thyTitle(value: string) {
        this.title = value;
    }

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuDividerTitle]',
})
export class ThyActionMenuDividerTitleDirective {

    @HostBinding('class.action-menu-divider-title') className = true;

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuItemActive]',
})
export class ThyActionMenuItemActiveDirective {

    @HostBinding('class.active') _isActive = false;

    @Input()
    set thyActionMenuItemActive(value: boolean) {
        this._isActive = inputValueToBoolean(value);
    }

    constructor() { }

}
