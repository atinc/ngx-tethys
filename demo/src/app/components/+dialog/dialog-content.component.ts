import { Component, TemplateRef, OnInit, HostBinding, Input } from '@angular/core';
import { ThyDialogRef, ThyDialog } from '../../../../../src/dialog';
import { ThyDialogFooterAlign } from '../../../../../src/dialog/dialog.config';

@Component({
    selector: 'demo-dialog-content',
    templateUrl: './dialog-content.component.html'
})
export class DemoDialogContentComponent implements OnInit {
    @HostBinding(`class.thy-dialog-content`) addFillColumn = true;

    @Input() align: ThyDialogFooterAlign;

    @Input() divider: ThyDialogFooterAlign;

    data: string;

    showMore = false;

    allowClear = true;

    constructor(private thyDialogRef: ThyDialogRef<any>, public thyDialog: ThyDialog) {}

    ngOnInit() {
        console.log(`ngOnInit get data: ${this.data}`);
    }

    openSubDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    ok() {
        this.thyDialogRef.close();
    }

    close() {
        this.thyDialogRef.close();
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }
}
