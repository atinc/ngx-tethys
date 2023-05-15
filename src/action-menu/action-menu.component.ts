import { Directive, HostBinding, Input, Component, ViewEncapsulation } from '@angular/core';

export type ThyActionMenuTheme = 'default' | 'group';

export type ThyActionMenuDividerType = 'default' | 'crossing';

/**
 * 操作菜单，用于`Popover`弹出菜单
 * @name thy-action-menu
 * @order 10
 */
@Component({
    selector: 'thy-action-menu',
    template: ` <ng-content></ng-content> `,
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class ThyActionMenuComponent {
    @HostBinding('class.action-menu') className = true;

    @HostBinding('class.action-menu--group') themeClassName = false;

    @HostBinding('style.width') styleWidth = '';

    /**
     * 操作菜单主题，支持默认和分组的形式
     * @type default | group
     * @default default
     */
    @Input()
    set thyTheme(value: ThyActionMenuTheme) {
        this.themeClassName = value === 'group';
    }

    /**
     * 菜单宽度，默认 $action-menu-width: 240px
     * @type string
     */
    @Input() set thyWidth(value: string) {
        this.styleWidth = value;
    }

    constructor() {}
}

/**
 * 操作菜单的分组
 * @name thy-action-menu-group
 * @order 20
 */
@Component({
    selector: 'thy-action-menu-group',
    template: `
        <div class="action-menu-group-title">{{ groupTitle }}</div>
        <ng-content></ng-content>
    `,
    standalone: true
})
export class ThyActionMenuGroupComponent {
    groupTitle: string;

    @HostBinding('class.action-menu-group') isGroup = true;

    /**
     * 分组的标题
     */
    @Input()
    set thyTitle(value: string) {
        this.groupTitle = value;
    }

    constructor() {}
}

/**
 * 操作菜单的分割线
 * @name thy-action-menu-divider
 * @order 30
 */
@Component({
    selector: 'thy-action-menu-divider',
    template: ` <div class="action-menu-divider-title">{{ title }}</div> `,
    standalone: true
})
export class ThyActionMenuDividerComponent {
    title: string;

    type: ThyActionMenuDividerType;

    @HostBinding('class.action-menu-divider') className = true;

    @HostBinding('class.action-menu-divider-crossing') isCrossing = false;

    /**
     * 标题
     * @type string
     */
    @Input()
    set thyTitle(value: string) {
        this.title = value;
    }

    /**
     * 类型
     * @type default | crossing
     * @default default
     */
    @Input()
    set thyType(value: ThyActionMenuDividerType) {
        this.isCrossing = value === 'crossing';
    }

    constructor() {}
}

/**
 * @name thyActionMenuDividerTitle
 */
@Directive({
    selector: '[thyActionMenuDividerTitle]',
    standalone: true
})
export class ThyActionMenuDividerTitleDirective {
    @HostBinding('class.action-menu-divider-title') className = true;

    constructor() {}
}
