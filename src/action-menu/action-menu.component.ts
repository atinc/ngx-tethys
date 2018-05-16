
import { Directive, HostBinding, Input, Component, HostListener } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

export type ThyActionMenuTheme = 'default' | 'group';

@Component({
    selector: 'thy-action-menu',
    template: `<ng-content></ng-content>`
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

    @Input() set thyActionMenuItem(value: any) {
        if (value) {
            this.disabled = inputValueToBoolean(value);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

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
