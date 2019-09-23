import { Component, TemplateRef } from '@angular/core';
import { ThyDialog } from 'ngx-tethys';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { DemoTreeSectionComponent } from '../../+tree';
import { taskTypes } from 'app/components/+select/mock-data';

@Component({
    selector: 'app-demo-dialog-interactive',
    templateUrl: './interactive.component.html'
})
export class DemoDialogInteractiveComponent {
    optionData = [];

    selectedItem = this.optionData[0];

    constructor(public thyDialog: ThyDialog) {
        this.optionData = taskTypes;
    }

    openTemplateDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    openTreeDemo() {
        this.thyDialog.open(DemoTreeSectionComponent);
    }
}
