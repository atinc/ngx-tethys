import { Component } from '@angular/core';
import { ThyDialog, ThyDialogLayoutConfig } from 'ngx-tethys';
import { ThyDialogFooterLayoutExampleComponent } from './dialog-layout.component';

@Component({
    selector: 'thy-dialog-layout-example',
    templateUrl: './layout.component.html'
})
export class ThyDialogLayoutExampleComponent {
    public layoutConfig: ThyDialogLayoutConfig = {
        footerAlign: 'left',
        footerDivided: false
    };

    constructor(private thyDialog: ThyDialog) {}

    openDialog() {
        this.thyDialog.open(ThyDialogFooterLayoutExampleComponent, {
            initialState: {
                layoutConfig: this.layoutConfig
            }
        });
    }
}
