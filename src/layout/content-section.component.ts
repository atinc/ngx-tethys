import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * 内容块区域布局组件，支持`thy-content-section`组件和`thyContentSection`指令两种形式
 * @name thy-content-section, [thyContentSection]
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
 * @internal
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
