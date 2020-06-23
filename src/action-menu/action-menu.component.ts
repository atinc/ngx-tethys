import { Directive, HostBinding, Input, Component, HostListener, ViewEncapsulation, ElementRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';

export type ThyActionMenuTheme = 'default' | 'group';

export type ThyActionMenuDividerType = 'default' | 'crossing';

@Component({
    selector: 'thy-action-menu',
    template: `
        <ng-content></ng-content>
    `,
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

    constructor() {}
}

@Component({
    selector: 'thy-action-menu-group',
    template: `
        <div class="action-menu-group-title">{{ groupTitle }}</div>
        <ng-content></ng-content>
    `
})
export class ThyActionMenuGroupComponent {
    groupTitle: string;

    @HostBinding('class.action-menu-group') isGroup = true;

    @Input()
    set thyTitle(value: string) {
        this.groupTitle = value;
    }

    constructor() {}
}

@Component({
    selector: 'thy-action-menu-divider',
    template: `
        <div class="action-menu-divider-title">{{ title }}</div>
    `
})
export class ThyActionMenuDividerComponent {
    title: string;

    type: ThyActionMenuDividerType;

    @HostBinding('class.action-menu-divider') className = true;

    @HostBinding('class.action-menu-divider-crossing') isCrossing = false;

    @Input()
    set thyTitle(value: string) {
        this.title = value;
    }

    @Input()
    set thyType(value: ThyActionMenuDividerType) {
        this.isCrossing = value === 'crossing';
    }

    constructor() {}
}

@Directive({
    selector: '[thyActionMenuDividerTitle]'
})
export class ThyActionMenuDividerTitleDirective {
    @HostBinding('class.action-menu-divider-title') className = true;

    constructor() {}
}
