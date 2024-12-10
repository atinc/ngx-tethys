import { Component, HostBinding, Input, inject } from '@angular/core';
import { ThyDialogLayoutConfig, ThyDialogRef } from 'ngx-tethys/dialog';

@Component({
    selector: 'thy-dialog-footer-layout-example',
    templateUrl: './dialog-layout.component.html',
    standalone: false
})
export class ThyDialogFooterLayoutExampleComponent {
    private thyDialogRef = inject<ThyDialogRef<any>>(ThyDialogRef);

    @HostBinding(`class.thy-dialog-content`) addFillColumn = true;

    @Input() layoutConfig: ThyDialogLayoutConfig;

    ok() {
        this.thyDialogRef.close();
    }

    close() {
        this.thyDialogRef.close();
    }
}
