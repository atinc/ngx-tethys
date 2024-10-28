import { Component, TemplateRef, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyDialog } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-stepper-switch-dialog-example',
    templateUrl: './switch-dialog.component.html'
})
export class ThyStepperSwitchDialogExampleComponent {
    private thyDialog = inject(ThyDialog);


    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template, {
            panelClass: 'selectDialogCustomer'
        });
    }
}
