import { Component, inject } from '@angular/core';
import { ThyDialog } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-basic-content',
    templateUrl: './dialog-content.component.html',
    standalone: false
})
export class ThyDialogBasicContentComponent {
    thyDialog = inject(ThyDialog);
}
