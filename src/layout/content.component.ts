import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容布局指令
 * @name thyContent
 * @order 15
 */
@Directive({
    selector: '[thyContent]:not(thy-badge):not([thyBadge])',
    host: {
        class: 'thy-layout-content'
    }
})
export class ThyContentDirective {}

/**
 * 内容布局组件
 * @name thy-content
 * @order 16
 */
@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyContentDirective]
})
export class ThyContent {}
