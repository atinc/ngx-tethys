import { Component, inject } from '@angular/core';
import { ThyDialog, ThyDialogHeader, ThyDialogBody, ThyDialogFooter } from 'ngx-tethys/dialog';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html',
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
export class ThyDialogBasicContentComponent {
    thyDialog = inject(ThyDialog);
}
