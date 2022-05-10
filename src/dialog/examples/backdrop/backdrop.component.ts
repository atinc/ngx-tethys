import { Component, OnInit } from '@angular/core';
import { ThyDialog, ThyDialogConfig } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-backdrop-example',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss']
})
export class ThyDialogBackdropExampleComponent {
    public isCustomBackdropClass: boolean;

    public config: ThyDialogConfig = {
        hasBackdrop: true,
        backdropClosable: true
    };

    constructor(private thyDialog: ThyDialog) {}

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, this.config);
    }

    setBackdropClass() {
        Object.assign(this.config, {
            backdropClass: this.isCustomBackdropClass ? 'custom-backdrop-class' : ''
        });
    }
}
