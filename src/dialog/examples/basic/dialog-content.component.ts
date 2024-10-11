import { Component } from '@angular/core';
import { ThyDialog } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html'
})
export class ThyDialogBasicContentComponent {
    constructor(public thyDialog: ThyDialog) {}
}
