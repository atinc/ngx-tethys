import { Component, OnInit } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-size-example',
    templateUrl: './size.component.html'
})
export class ThyDialogSizeExampleComponent implements OnInit {
    private config: ThyDialogConfig = {};

    constructor(private thyDialog: ThyDialog) {}

    dialogSizes = [
        {
            value: 'sm',
            width: '400px'
        },
        {
            value: 'default',
            width: '660px'
        },
        {
            value: 'lg',
            width: '800px'
        },
        {
            value: 'maxLg',
            width: '980px'
        },
        {
            value: 'supperLg',
            width: '94vw'
        },
        {
            value: 'full',
            width: '全屏'
        }
    ];

    ngOnInit() {}

    openDialog(size: ThyDialogSizes) {
        this.thyDialog.open(
            ThyDialogBasicContentComponent,
            Object.assign(this.config, {
                size: ThyDialogSizes[size]
            })
        );
    }
}
