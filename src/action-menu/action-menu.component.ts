
import { Directive, HostBinding, Input } from '@angular/core';

export type ThyActionMenuTheme = 'default' | 'group';

@Directive({
    selector: '[thyActionMenu]',
})
export class ThyActionMenuDirective {

    @HostBinding('class.action-menu') className = true;

    @HostBinding('class.action-menu--group') themeClassName = false;

    @Input()
    set thyTheme(value: ThyActionMenuTheme) {
        this.themeClassName = value === 'group';
    }

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuItem]',
})
export class ThyActionMenuItemDirective {

    @HostBinding('class.action-menu-item') className = true;

    @HostBinding('attr.href') href = 'javascript:;';

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuSubItem]',
})
export class ThyActionMenuSubItemDirective {

    @HostBinding('class.action-menu-sub-item') className = true;

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuDivider]',
})
export class ThyActionMenuDividerDirective {

    @HostBinding('class.action-menu-divider') className = true;

    constructor() { }
}

@Directive({
    selector: '[thyActionMenuDividerTitle]',
})
export class ThyActionMenuDividerTitleDirective {

    @HostBinding('class.action-menu-divider-title') className = true;

    constructor() { }
}
