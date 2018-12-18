import { Component, TemplateRef, OnInit } from '@angular/core';
import { DateRangeItemInfo } from '../../../../../src/date-range/date-range.class';
import { helpers } from '../../../../../src/util';
import { ThyDialogRef, ThyDialog } from '../../../../../src/dialog';
import { debug } from 'util';

@Component({
    selector: 'demo-dialog-content',
    templateUrl: './dialog-content.component.html'
})
export class DemoDialogContentComponent implements OnInit {
    data: string;

    showMore = false;

    constructor(
        private thyDialogRef: ThyDialogRef<any>,
        public thyDialog: ThyDialog
    ) {}

    ngOnInit() {
        console.log(`ngOnInit get data: ${this.data}`);
    }

    openSubDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    ok() {
        this.thyDialogRef.close();
    }

    toggleShowMore() {
        this.showMore = true;
    }
}
