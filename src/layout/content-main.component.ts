import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容主区域布局组件，支持`thy-content-main`组件和`thyContentMain`指令两种形式
 * @name thy-content-main, [thyContentMain]
 * @order 45
 */
@Directive({
    selector: '[thyContentMain]',
    host: {
        class: 'thy-layout-content-main'
    },
    standalone: true
})
export class ThyContentMainDirective {}

/**
 * @internal
 */
@Component({
    selector: 'thy-content-main',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyContentMainDirective],
    standalone: true
})
export class ThyContentMainComponent {}
