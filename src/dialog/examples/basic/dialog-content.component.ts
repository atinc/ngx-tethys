import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html',
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
export class ThyDialogBasicContentComponent {
    thyDialog = inject(ThyDialog);
}
