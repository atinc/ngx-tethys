import { Component, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyDialog } from 'ngx-tethys';

@Component({
    selector: 'thy-stepper-switch-dialog-example',
    templateUrl: './switch-dialog.component.html'
})
export class ThyStepperSwitchDialogExampleComponent {
    constructor(private thyDialog: ThyDialog) {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template, {
            panelClass: 'selectDialogCustomer'
        });
    }
}
