import { Component, OnInit, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyDialogBasicContentComponent } from '../basic/dialog-content.component';

@Component({
    selector: 'thy-dialog-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButton]
})
export class ThyDialogSizeExampleComponent implements OnInit {
    private thyDialog = inject(ThyDialog);

    private config: ThyDialogConfig = {};

    dialogSizes: { value: ThyDialogSizes; width: string }[] = [
        {
            value: ThyDialogSizes.sm,
            width: '400px'
        },
        {
            value: ThyDialogSizes.md,
            width: '660px'
        },
        {
            value: ThyDialogSizes.lg,
            width: '800px'
        },
        {
            value: ThyDialogSizes.maxLg,
            width: '980px'
        },
        {
            value: ThyDialogSizes.superLg,
            width: '94vw'
        },
        {
            value: ThyDialogSizes.full,
            width: '全屏'
        }
    ];

    ngOnInit() {}

    openDialog(size: ThyDialogSizes) {
        this.thyDialog.open(
            ThyDialogBasicContentComponent,
            Object.assign(this.config, {
                size: size
            })
        );
    }
}
