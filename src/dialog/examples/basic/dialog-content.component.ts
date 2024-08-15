import { Component, TemplateRef, OnInit, HostBinding, Input } from '@angular/core';
import { ThyDialogRef, ThyDialog, ThyDialogFooterAlign } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html'
})
export class ThyDialogBasicContentComponent implements OnInit {
    @HostBinding(`class.thy-dialog-content`) addFillColumn = true;

    @Input() align: ThyDialogFooterAlign;

    @Input() divider: ThyDialogFooterAlign;

    data: string;

    showMore = false;

    allowClear = true;

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

    close() {
        this.thyDialogRef.close();
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }
}
