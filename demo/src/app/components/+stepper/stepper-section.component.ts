import { Component, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyDialog } from '../../../../../src/dialog';

@Component({
    selector: 'demo-stepper-section',
    templateUrl: './stepper-section.component.html',
    styleUrls: ['./stepper-section.component.scss']
})
export class DemoStepperSectionComponent {
    constructor(private thyDialog: ThyDialog) {}

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template, {
            panelClass: 'selectDialogCustomer'
        });
    }
}
