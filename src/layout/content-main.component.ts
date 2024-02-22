import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容主区域布局指令
 * @name thyContentMain
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
 * 内容主区域布局组件
 * @name thy-content-main
 * @order 46
 */
@Component({
    selector: 'thy-content-main',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyContentMainDirective],
    standalone: true
})
export class ThyContentMain {}
