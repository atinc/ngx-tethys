import { ChangeDetectionStrategy, Component, Directive, OnInit } from '@angular/core';

/**
 * 侧边栏底部布局指令
 * @name thySidebarFooter
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
 * 侧边栏底部布局组件
 * @name thy-sidebar-footer
 * @order 36
 */
@Component({
    selector: 'thy-sidebar-footer',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThySidebarFooterDirective],
    standalone: true
})
export class ThySidebarFooterComponent {}
