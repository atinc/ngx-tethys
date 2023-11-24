import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容布局组件，支持`thy-content`组件和`thyContent`指令两种形式
 * @name thy-content, [thyContent]
 * @order 15
 */
@Directive({
    selector: '[thyContent]',
    host: {
        class: 'thy-layout-content'
    },
    standalone: true
})
export class ThyContentDirective {}

/**
 * @internal
 */
@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyContentDirective],
    standalone: true
})
export class ThyContentComponent {}
