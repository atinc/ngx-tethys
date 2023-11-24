import { ChangeDetectionStrategy, Component, Directive, OnInit } from '@angular/core';

/**
 * 侧边栏底部布局组件，支持`thy-sidebar-footer`组件和`thySidebarFooter`指令两种形式
 * @name thy-sidebar-footer, [thySidebarFooter]
 * @order 35
 */
@Directive({
    selector: '[thySidebarFooter]',
    host: {
        class: 'sidebar-footer'
    },
    standalone: true
})
export class ThySidebarFooterDirective {}

/**
 * @internal
 */
@Component({
    selector: 'thy-sidebar-footer',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThySidebarFooterDirective],
    standalone: true
})
export class ThySidebarFooterComponent {}
