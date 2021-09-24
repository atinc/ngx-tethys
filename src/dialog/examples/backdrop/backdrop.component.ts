import { Component } from '@angular/core';
import { ThyDialog, ThyDialogConfig } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-backdrop-example',
    templateUrl: './backdrop.component.html'
})
export class ThyDialogBackdropExampleComponent {
    public config: ThyDialogConfig = {
        backdropClosable: true,
        closeOnNavigation: true
    };

    constructor(private thyDialog: ThyDialog) {}

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, this.config);
    }
}
