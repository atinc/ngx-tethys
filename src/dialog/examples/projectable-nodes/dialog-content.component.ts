import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyDialog, ThyDialogHeader, ThyDialogBody, ThyDialogFooter } from 'ngx-tethys/dialog';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
export class ThyDialogBasicContentComponent {
    thyDialog = inject(ThyDialog);
}
