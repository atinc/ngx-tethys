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

    openDialog(footerAlign: string) {
        this.thyDialog.open(ThyDialogFooterLayoutExampleComponent, {
            initialState: {
                layoutConfig: Object.assign(this.layoutConfig, { footerAlign: footerAlign })
            }
        });
    }
}
