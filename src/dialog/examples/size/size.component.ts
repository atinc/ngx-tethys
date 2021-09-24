import { Component, OnInit } from '@angular/core';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-size-example',
    templateUrl: './size.component.html'
})
export class ThyDialogSizeExampleComponent implements OnInit {
    public currentSize = {
        value: 'default',
        width: '660px'
    };

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

    openDialog() {
        this.thyDialog.open(ThyDialogBasicContentComponent, {
            size: ThyDialogSizes[this.currentSize.value]
        });
    }
}
