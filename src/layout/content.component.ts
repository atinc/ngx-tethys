import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * 布局内容组件
 */
@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-layout-content'
    },
    standalone: true
})
export class ThyContentComponent {}
