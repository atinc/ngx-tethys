import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 模态框的主体组件
 * @name thy-dialog-body
 * @order 50
 */
@Component({
    selector: 'thy-dialog-body',
    template: '<ng-content></ng-content>',
    exportAs: 'thyDialogBody',
    hostDirectives: [CdkScrollable],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        class: 'dialog-body',
        '[class.dialog-body-clear-padding]': 'thyClearPadding()'
    }
})
export class ThyDialogBody {
    /**
     * 清除间距
     */
    readonly thyClearPadding = input(false, { transform: coerceBooleanProperty });
}
