import { Component, inject, input, OnInit } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogRef, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialogHeader, ThyDialogBody, ThyDialogFooter } from 'ngx-tethys/dialog';

@Component({
    selector: `thy-dialog-pass-data-content-example`,
    template: `
        <thy-dialog-header thyTitle="Dialog with pass data"></thy-dialog-header>
        <thy-dialog-body> {{ propData }} {{ inputData() }} </thy-dialog-body>
        <thy-dialog-footer>
            <button thyButton="primary" (click)="dialogRef.close()">确定</button>
        </thy-dialog-footer>
    `,
    standalone: true,
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
class ThyDialogPassDataContentComponent {
    propData: string;

    inputData = input('');

    dialogRef = inject(ThyDialogRef);
}

@Component({
    selector: 'thy-dialog-pass-data-example',
    templateUrl: './pass-data.component.html',
    standalone: true,
    imports: [ThyButton]
})
export class ThyDialogPassDataExampleComponent implements OnInit {
    private config: ThyDialogConfig = {};

    constructor(private thyDialog: ThyDialog) {}

    ngOnInit() {}

    openDialog() {
        this.thyDialog.open(ThyDialogPassDataContentComponent, {
            initialState: {
                propData: 'Hello',
                inputData: 'World'
            }
        });
    }
}
