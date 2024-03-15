import { ChangeDetectionStrategy, Component, Directive, OnInit } from '@angular/core';

/**
 * 侧边栏内容布局指令
 * @name thySidebarContent
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
 * 侧边栏内容布局组件
 * @name thy-sidebar-content
 * @order 31
 */
@Component({
    selector: 'thy-sidebar-content',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThySidebarContentDirective],
    standalone: true
})
export class ThySidebarContent {}
