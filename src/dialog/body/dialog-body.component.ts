import { Component, OnInit, inject, input } from '@angular/core';
import { ThyDialog } from '../dialog.service';
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
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogBody',
    hostDirectives: [CdkScrollable],
    host: {
        class: 'dialog-body',
        '[class.dialog-body-clear-padding]': 'thyClearPadding()'
    }
})
export class ThyDialogBody implements OnInit {
    private dialog = inject(ThyDialog);
    /**
     * 清除间距
     */
    readonly thyClearPadding = input(false, { transform: coerceBooleanProperty });

    ngOnInit() {}
}
