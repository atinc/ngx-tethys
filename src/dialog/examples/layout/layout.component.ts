import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogLayoutConfig } from 'ngx-tethys/dialog';
import { ThyDialogFooterLayoutExampleComponent } from './dialog-layout.component';
import { ThyButton } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-dialog-layout-example',
    templateUrl: './layout.component.html',
    imports: [ThyButton, FormsModule, ThyCheckbox]
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
