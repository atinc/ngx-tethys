import { Component, OnInit, inject } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyDialogSizeExampleComponent implements OnInit {
    private thyDialog = inject(ThyDialog);

    private config: ThyDialogConfig = {};

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
            value: 'superLg',
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
