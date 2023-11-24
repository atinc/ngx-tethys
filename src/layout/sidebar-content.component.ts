import { ChangeDetectionStrategy, Component, Directive, OnInit } from '@angular/core';

/**
 *  侧边栏内容布局组件，支持`thy-sidebar-content`组件和`thySidebarContent`指令两种形式
 *  @name thy-sidebar-content, [thySidebarContent]
 * @order 30
 */
@Directive({
    selector: '[thySidebarContent]',
    host: {
        class: 'sidebar-content'
    },
    standalone: true
})
export class ThySidebarContentDirective {}

/**
 * @internal
 */
@Component({
    selector: 'thy-sidebar-content',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThySidebarContentDirective],
    standalone: true
})
export class ThySidebarContentComponent {}
