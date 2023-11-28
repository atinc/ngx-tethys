import { ChangeDetectionStrategy, Component, Directive, HostBinding } from '@angular/core';

/**
 * 布局指令
 * @name thyLayout
 * @order 5
 */
@Directive({
    selector: '[thyLayout]',
    host: {
        class: 'thy-layout',
        '[class.thy-layout--has-sidebar]': 'hasSidebar',
        '[class.thy-layout--is-sidebar-right]': 'isSidebarRight'
    },
    standalone: true
})
export class ThyLayoutDirective {
    hasSidebar = false;
    isSidebarRight = false;
}

/**
 * 布局组件
 * @name thy-layout
 * @order 6
 */
@Component({
    selector: 'thy-layout',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyLayoutDirective],
    standalone: true
})
export class ThyLayout {}
