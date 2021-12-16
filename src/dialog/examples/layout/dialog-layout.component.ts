import { Component, HostBinding, Input } from '@angular/core';
import { ThyDialogLayoutConfig, ThyDialogRef } from 'ngx-tethys';

@Component({
    selector: 'thy-dialog-footer-layout-example',
    templateUrl: './dialog-layout.component.html'
})
export class ThyDialogFooterLayoutExampleComponent {
    @HostBinding(`class.thy-dialog-content`) addFillColumn = true;

    @Input() layoutConfig: ThyDialogLayoutConfig;

    constructor(private thyDialogRef: ThyDialogRef<any>) {}

    ok() {
        this.thyDialogRef.close();
    }

    close() {
        this.thyDialogRef.close();
    }
}
