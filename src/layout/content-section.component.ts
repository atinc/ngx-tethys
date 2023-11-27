import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容块区域布局指令
 * @name thyContentSection
 * @order 40
 */
@Directive({
    selector: '[thyContentSection]',
    host: {
        class: 'thy-layout-content-section'
    },
    standalone: true
})
export class ThyContentSectionDirective {}

/**
 * 内容块区域布局组件
 * @name thy-content-section
 * @order 41
 */
@Component({
    selector: 'thy-content-section',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyContentSectionDirective],
    standalone: true
})
export class ThyContentSectionComponent {}
