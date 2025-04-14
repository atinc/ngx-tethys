import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html',
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter]
})
export class ThyDialogBasicContentComponent {
    thyDialog = inject(ThyDialog);
}
