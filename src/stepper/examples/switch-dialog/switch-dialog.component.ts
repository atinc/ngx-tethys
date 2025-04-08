import { Component, TemplateRef, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThyStep, ThyStepper, ThyStepperNextDirective, ThyStepperPreviousDirective } from 'ngx-tethys/stepper';

@Component({
    selector: 'thy-stepper-switch-dialog-example',
    templateUrl: './switch-dialog.component.html',
    imports: [
        ThyButton,
        ThyDialogHeader,
        ThyStep,
        ThyDialogBody,
        ThyDialogFooter,
        ThyStepper,
        ThyStepperNextDirective,
        ThyStepperPreviousDirective
    ]
})
export class ThyStepperSwitchDialogExampleComponent {
    private thyDialog = inject(ThyDialog);

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template, {
            panelClass: 'selectDialogCustomer'
        });
    }
}
