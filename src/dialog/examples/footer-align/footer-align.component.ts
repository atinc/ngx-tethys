import { Component, OnInit } from '@angular/core';
import { ThyDialog } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-footer-align-example',
    templateUrl: './footer-align.component.html'
})
export class ThyDialogFooterAlignExampleComponent implements OnInit {
    public footerAlign = 'left';

    constructor(private thyDialog: ThyDialog) {}

    ngOnInit() {}

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, {
            initialState: {
                align: this.footerAlign
            }
        });
    }
}
