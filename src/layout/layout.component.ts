import { ChangeDetectionStrategy, Component, Directive, HostBinding } from '@angular/core';

/**
 * 布局组件，支持`thy-layout`组件和`thyLayout`指令两种形式
 * @name thy-layout, [thyLayout]
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
 * @internal
 */
@Component({
    selector: 'thy-layout',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyLayoutDirective],
    standalone: true
})
export class ThyLayoutComponent {}
