import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogLayoutConfig } from 'ngx-tethys/dialog';
import { ThyDialogFooterLayoutExampleComponent } from './dialog-layout.component';

@Component({
    selector: 'thy-dialog-layout-example',
    templateUrl: './layout.component.html'
})
export class ThyDialogLayoutExampleComponent {
    private thyDialog = inject(ThyDialog);

    public layoutConfig: ThyDialogLayoutConfig = {
        footerAlign: 'left',
        footerDivided: false
    };

    openDialog(footerAlign: string) {
        this.thyDialog.open(ThyDialogFooterLayoutExampleComponent, {
            initialState: {
                layoutConfig: Object.assign(this.layoutConfig, { footerAlign: footerAlign })
            }
        });
    }
}
