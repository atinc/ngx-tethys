import { Component, OnInit } from '@angular/core';
import { ThyDialog, ThyDialogConfig } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-backdrop-example',
    templateUrl: './backdrop.component.html',
    styleUrls: ['./backdrop.component.scss']
})
export class ThyDialogBackdropExampleComponent implements OnInit {
    public isCustomBackdropClass: boolean;

    public config: ThyDialogConfig;

    constructor(private thyDialog: ThyDialog) {}

    ngOnInit() {
        this.config = {
            hasBackdrop: true,
            backdropClosable: true
        };
    }

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, this.config);
    }

    setBackdropClass() {
        Object.assign(this.config, {
            backdropClass: this.isCustomBackdropClass ? 'custom-backdrop-class' : ''
        });
    }
}
