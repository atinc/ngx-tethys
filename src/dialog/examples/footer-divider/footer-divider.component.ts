import { Component } from '@angular/core';
import { ThyDialog } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-footer-divider-example',
    templateUrl: './footer-divider.component.html'
})
export class ThyDialogFooterDividerExampleComponent {
    public divider: Boolean = false;

    constructor(private thyDialog: ThyDialog) {}

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, {
            initialState: {
                divider: this.divider
            }
        });
    }
}
