import { Component, TemplateRef } from '@angular/core';
import { DateRangeItemInfo } from '../../../../../src/date-range/date-range.class';
import { helpers } from '../../../../../src/util';
import { ThyDialogRef, ThyDialog } from '../../../../../src/dialog';

@Component({
    selector: 'demo-dialog-content',
    templateUrl: './dialog-content.component.html'
})
export class DemoDialogContentComponent {
    constructor(
        private thyDialogRef: ThyDialogRef<any>,
        public thyDialog: ThyDialog
    ) {}

    openSubDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    ok() {
        this.thyDialogRef.close();
    }
}
