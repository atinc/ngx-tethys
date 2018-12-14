import { Component } from '@angular/core';
import { ThyDialog } from '../../../../../src/dialog';
import { helpers } from '../../../../../src/util';
import { DemoDialogContentComponent } from './dialog-content.component';

@Component({
    selector: 'demo-dialog-section',
    templateUrl: './dialog-section.component.html'
})
export class DemoDialogSectionComponent {
    public apiParameters = [
        {
            property: 'ngModel',
            description: '双向绑定值,选中的可选值列表项或者具体时间',
            type: 'DateRangeItemInfo',
            default: ''
        }
    ];

    constructor(private thyDialog: ThyDialog) {}

    openComponentDialog() {
        const dialogRef = this.thyDialog.open(DemoDialogContentComponent, {});
    }
}
