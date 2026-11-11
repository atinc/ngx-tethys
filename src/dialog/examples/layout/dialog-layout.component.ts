import { Component, HostBinding, inject, input } from '@angular/core';
import { ThyDialogFooter, ThyDialogLayoutConfig, ThyDialogRef, ThyDialogHeader, ThyDialogBody } from 'ngx-tethys/dialog';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dialog-footer-layout-example',
    templateUrl: './dialog-layout.component.html',
    imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton]
})
export class ThyDialogFooterLayoutExampleComponent {
    private thyDialogRef = inject<ThyDialogRef<any>>(ThyDialogRef);

    @HostBinding(`class.thy-dialog-content`) addFillColumn = true;

    readonly layoutConfig = input<ThyDialogLayoutConfig>();

    ok() {
        this.thyDialogRef.close();
    }

    close() {
        this.thyDialogRef.close();
    }
}
