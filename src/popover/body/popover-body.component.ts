import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

/**
 * 悬浮层内容组件
 * @name thy-popover-body
 */
@Component({
    selector: 'thy-popover-body',
    template: '<ng-content></ng-content>',
    exportAs: 'thyPopoverBody',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-popover-body'
    },
    standalone: true
})
export class ThyPopoverBodyComponent {}
