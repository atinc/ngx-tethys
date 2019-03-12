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
import { inputValueToBoolean } from '../../util/helpers';

@Component({
    selector: 'thy-dialog-body',
    template: '<ng-content></ng-content>',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogBody'
})
export class DialogBodyComponent implements OnInit {
    @HostBinding(`class.dialog-body`) _isDialogBody = true;

    @HostBinding(`class.dialog-body-clear-padding`)
    thyClearPaddingClassName = false;

    @Input()
    set thyClearPadding(value: string) {
        this.thyClearPaddingClassName = inputValueToBoolean(value);
    }

    constructor(private dialog: ThyDialog) {}

    ngOnInit() {}
}
