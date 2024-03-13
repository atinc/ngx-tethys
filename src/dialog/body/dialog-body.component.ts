import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { CdkScrollable } from '@angular/cdk/scrolling';

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
    standalone: true,
    hostDirectives: [CdkScrollable]
})
export class ThyDialogBody implements OnInit {
    @HostBinding(`class.dialog-body`) _isDialogBody = true;

    @HostBinding(`class.dialog-body-clear-padding`)
    thyClearPaddingClassName = false;

    /**
     * 清除间距
     * @default false
     */
    @Input()
    set thyClearPadding(value: string) {
        this.thyClearPaddingClassName = coerceBooleanProperty(value);
    }

    constructor(private dialog: ThyDialog) {}

    ngOnInit() {}
}
