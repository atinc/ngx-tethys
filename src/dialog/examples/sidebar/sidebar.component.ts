import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogSidebarContentExampleComponent } from './dialog-sidebar.component';

@Component({
    selector: 'thy-dialog-sidebar-example',
    templateUrl: './sidebar.component.html'
})
export class ThyDialogSidebarExampleComponent {
    private thyDialog = inject(ThyDialog);


    openDialog() {
        this.thyDialog.open(ThyDialogSidebarContentExampleComponent, {
            size: ThyDialogSizes.maxLg
        });
    }
}
