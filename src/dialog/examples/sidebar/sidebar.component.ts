import { Component, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogSidebarContentExampleComponent } from './dialog-sidebar.component';

@Component({
    selector: 'thy-dialog-sidebar-example',
    templateUrl: './sidebar.component.html',
    imports: [ThyButton]
})
export class ThyDialogSidebarExampleComponent {
    private thyDialog = inject(ThyDialog);

    openDialog() {
        this.thyDialog.open(ThyDialogSidebarContentExampleComponent, {
            size: ThyDialogSizes.maxLg
        });
    }
}
