import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * 悬浮层内容组件
 * @name thy-popover-body
 * @order 40
 */
@Component({
    selector: 'thy-popover-body',
    template: '<ng-content></ng-content>',
    exportAs: 'thyPopoverBody',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-popover-body'
    }
})
export class ThyPopoverBody {}
