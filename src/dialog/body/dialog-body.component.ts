import { Component, Input, OnInit, HostBinding, inject } from '@angular/core';
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
    hostDirectives: [CdkScrollable]
})
export class ThyDialogBody implements OnInit {
    private dialog = inject(ThyDialog);

    @HostBinding(`class.dialog-body`) _isDialogBody = true;

    @HostBinding(`class.dialog-body-clear-padding`)
    thyClearPaddingClassName = false;

    /**
     * 清除间距
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyClearPadding(value: boolean) {
        this.thyClearPaddingClassName = value;
    }

    ngOnInit() {}
}
