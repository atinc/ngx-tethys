import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 模态框的主体组件
 */
@Component({
    selector: 'thy-dialog-body',
    template: '<ng-content></ng-content>',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogBody',
    standalone: true
})
export class DialogBodyComponent implements OnInit {
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
