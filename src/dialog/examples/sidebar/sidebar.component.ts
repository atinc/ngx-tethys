import { Component } from '@angular/core';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogSidebarContentExampleComponent } from './dialog-sidebar.component';

@Component({
    selector: 'thy-dialog-sidebar-example',
    templateUrl: './sidebar.component.html'
})
export class ThyDialogSidebarExampleComponent {
    constructor(private thyDialog: ThyDialog) {}

    openDialog() {
        this.thyDialog.open(ThyDialogSidebarContentExampleComponent, {
            height: '650px',
            size: ThyDialogSizes.maxLg
        });
    }
}
