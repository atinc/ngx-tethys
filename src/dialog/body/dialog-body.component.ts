import {
    Component,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    TemplateRef,
    OnInit,
    HostBinding,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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

    @Input()
    set thyClearPadding(value: string) {
        this.thyClearPaddingClassName = coerceBooleanProperty(value);
    }

    constructor(private dialog: ThyDialog) {}

    ngOnInit() {}
}
